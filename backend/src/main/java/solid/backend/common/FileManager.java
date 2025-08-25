package solid.backend.common;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import solid.backend.config.FileStorageConfig;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.UUID;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class FileManager {

    private final FileStorageConfig fileStorageConfig;

    /**
     * 설명 : 파일 업로드 공통 메소드
     * @param file, subFolder
     * @return Stirng
     */
    public String addFile(MultipartFile file, String subFolder) {
        try {
            if (file == null || file.isEmpty()) return null;

            // 파일 크기 제한 (1MB)
            long maxFileSize = 1024 * 1024;
            if (file.getSize() > maxFileSize) {
                throw new IllegalArgumentException("파일 크기는 1MB를 초과할 수 없습니다.");
            }

            // 파일 확장자 검사
            String originalName = file.getOriginalFilename();
            if (originalName == null) {
                throw new IllegalArgumentException("파일명이 없습니다.");
            }

            String lowerName = originalName.toLowerCase();
            if (!lowerName.endsWith(".jpg") && !lowerName.endsWith(".png") && !lowerName.endsWith(".jpeg")) {
                throw new IllegalArgumentException("허용되지 않는 파일 형식입니다. (jpg, png, jpeg만 가능)");
            }

            // 파일명 길이 제한
            if (originalName.length() > 300) {
                throw new IllegalArgumentException("파일명이 너무 깁니다. 300자 이하로 제한됩니다.");
            }

            // 저장 경로 설정
            String uploadDir = fileStorageConfig.getUploadDir() + File.separator + subFolder;
            File dir = new File(uploadDir);

            // 디렉토리가 없으면 생성
            if (!dir.exists()) dir.mkdirs();

            // 한글 및 특수문자 제거
            String safeName = originalName.replaceAll("[^a-zA-Z0-9._-]", "_");
            String fileName = UUID.randomUUID() + "_" + safeName;

            // 실제 저장
            String savePath = uploadDir + File.separator + fileName;
            file.transferTo(new File(savePath));

            // DB에 저장할 경로 (URL)
            return "/" + subFolder + "/" + fileName;

        } catch (IOException | IllegalStateException e) {
            throw new RuntimeException("파일 업로드 실패: " + e.getMessage(), e);
        } catch (IllegalArgumentException e) {
            throw e;
        }
    }

    /**
     * 설명 : 파일 삭제 공통 메서드
     * @param fileImgUrl
     */
    public void deleteFile(String fileImgUrl) {
        if (fileImgUrl == null || fileImgUrl.isEmpty()) return;

        String baseDir = fileStorageConfig.getUploadDir();
        String fullPath = baseDir + File.separator + fileImgUrl;

        File file = new File(fullPath);
        log.info("삭제 대상 경로: " + fullPath);
        if (file.exists()) {
            boolean deleted = file.delete();
            if (!deleted) log.error("파일 삭제 실패: " + fullPath);
        } else {
            log.error("파일이 존재하지 않음: " + fullPath);
        }
    }

    /**
     * 설명 : 파일 조회 url 가공
     * @param fileImgUrl
     * @return String
     */
    public String getFileUrl(String fileImgUrl) {
        if (fileImgUrl == null || fileImgUrl.isEmpty()) return null;
        String processedUrl = ServletUriComponentsBuilder.fromCurrentContextPath().path("/solid").toUriString();
        return processedUrl + fileImgUrl;
    }

    /**
     * 설명 : 카카오 이미지 다운로드 후 MultipartFile 변환
     * @param imageUrl
     * @return MultipartFile
     */
    public MultipartFile toMultipartFile(String imageUrl) {
        try {
            // 1. 카카오 이미지 다운로드
            URL url = new URL(imageUrl);
            try (InputStream inputStream = url.openStream()) {
                byte[] bytes = inputStream.readAllBytes();

                // 2. 확장자 추출
                String lowerUrl = imageUrl.toLowerCase();
                String extension = ".jpg";
                if (lowerUrl.endsWith(".png")) {
                    extension = ".png";
                } else if (lowerUrl.endsWith(".jpeg")) {
                    extension = ".jpeg";
                } else if (lowerUrl.endsWith(".jpg")) {
                    extension = ".jpg";
                }

                // 3. MultipartFile 변환 후 반환
                return new MockMultipartFile(
                        "file",
                        extension,
                        "image/" + extension.replace(".", ""),
                        bytes
                );
            }
        } catch (Exception e) {
            throw new RuntimeException("카카오 프로필 이미지 변환 실패: " + e.getMessage(), e);
        }
    }

}
