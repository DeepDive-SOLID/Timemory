package solid.backend.censorship.service;

public interface CensorshipService {

    /**
     * 설명 : 캡슐 내용 검열
     * @param content
     * @return Boolean
     */
    Boolean checkContent(String content);
}
