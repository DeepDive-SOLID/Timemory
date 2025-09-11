package solid.backend.config;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.cache.interceptor.KeyGenerator;

import java.lang.reflect.Method;
import java.util.Arrays;

/**
 * 캐시 설정 클래스
 * Spring Cache를 활성화하고 메모리 기반 캐싱을 구성합니다.
 * 
 * @author Timemory Team
 */
@Configuration
@EnableCaching  // Spring Cache 기능 활성화
public class CacheConfig {
    
    /**
     * 캐시 매니저 빈 설정
     * ConcurrentMapCacheManager를 사용하여 메모리 기반 캐싱을 구현합니다.
     * 
     * 캐시 이름 설명:
     * - teams: 팀별 멤버 목록 캐싱 (팀 ID가 키)
     * - memberTeams: 멤버가 속한 팀 목록 캐싱 (멤버 ID가 키)
     * - anniversaries: 기념일/오픈 그룹 리스트 캐싱 
     * - memberInfo: 멤버 상세 정보 캐싱 (멤버 ID가 키)
     * - mypageInfo: 마이페이지 회원 정보 캐싱 (멤버 ID가 키)
     * 
     * @return CacheManager 인스턴스
     */
    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager(
            "teams",            // TeamService.getTeamMembers()에서 사용
            "memberTeams",      // MemberService.getMemberTeams()에서 사용
            "anniversaries",    // OpenService.getOpenList()에서 사용
            "memberInfo",       // MemberService.getMember()에서 사용
            "mypageInfo"        // MypageService.getMemberDto()에서 사용
        );
    }
    
    /**
     * 커스텀 키 생성기 빈 설정
     * 캐시 키를 메서드명과 파라미터를 조합하여 생성합니다.
     * 
     * 사용 예: @Cacheable(keyGenerator = "customKeyGenerator")
     * 
     * @return KeyGenerator 인스턴스
     */
    @Bean("customKeyGenerator")
    public KeyGenerator keyGenerator() {
        return new KeyGenerator() {
            @Override
            public Object generate(Object target, Method method, Object... params) {
                // 메서드명_[파라미터배열] 형식으로 키 생성
                return method.getName() + "_" + Arrays.deepToString(params);
            }
        };
    }
}