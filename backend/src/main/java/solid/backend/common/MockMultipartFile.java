package solid.backend.common;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

@AllArgsConstructor
@NoArgsConstructor
public class MockMultipartFile implements MultipartFile {

    private String name;
    private String originalFilename;
    private String contentType;
    private byte[] bytes;

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getOriginalFilename() {
        return originalFilename;
    }

    @Override
    public String getContentType() {
        return contentType;
    }

    @Override
    public boolean isEmpty() {
        return bytes == null || bytes.length == 0;
    }

    @Override
    public long getSize() {
        return bytes.length;
    }

    @Override
    public byte[] getBytes() {
        return bytes;
    }

    @Override
    public InputStream getInputStream() {
        return new ByteArrayInputStream(bytes);
    }

    @Override
    public void transferTo(java.io.File dest) throws IOException {
        java.nio.file.Files.write(dest.toPath(), bytes);
    }
}
