package solid.backend.mypage.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MypageDto {

    private String memberName;
    private String memberNickname;
    private String memberEmail;
    private String memberPhone;
    private LocalDate memberBirth;
    private String memberImg;
}
