import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { CapsuleDetailDto } from "../types/capsule.ts";
import { capsuleDetailApi } from "../api/CapsuleApi.ts";
import StatusBar from "../components/APP/StatusBar.tsx";
import { inputbox_lg, mini_logo, profile_img } from "../assets";
import TagAnimation from "../components/UI/TagAnimation.tsx";
import styles from "../styles/CapsuleDetail.module.scss";
import { getValidProfileImageUrl } from "../utils/imageUtils.ts";

const CapsuleDetail = () => {
    const { capId } = useParams<{ capId: string }>();
    const [capsule, setCapsule] = useState<CapsuleDetailDto>();
    const [tags, setTags] = useState<string[]>([]);
    const capsuleId = Number(capId);

    useEffect(() => {
        const fetchCapsule = async () => {
            try {
                const res = await capsuleDetailApi(capsuleId);
                setCapsule(res);
                setTags(res.capTag.split(","));
            } catch (err) {
                console.error("캡슐 조회 실패 : ", err);
            }
        }
        fetchCapsule();
    }, []);

    return (
        <div className={styles.container}>
            {capsule && (
                <StatusBar
                    to={-1}
                    title={`${capsule.teamName} (${capsule.memberProfiles.length})`}
                    members={capsule.memberProfiles.map((m) => getValidProfileImageUrl(m) ?? profile_img)}
                />
            )}
            <div className={styles.content}>
                <img
                    src={capsule?.capImg ?? mini_logo}
                    alt="캡슐 이미지"
                    className={styles.capsuleImage}
                />
                <p className={styles.date}>{capsule?.capUt.split("T")[0].replace(/-/g, '.')}</p>
                <div className={styles.tagBox}>
                    <TagAnimation tags={tags!} rows={2} baseSpeedSec={18}/>
                </div>
                <div className={styles.inputContainer}>
                    <img src={inputbox_lg} alt="Input Box" className={styles.inputImage}/>
                    <div className={styles.inputText}>
                        {capsule?.capText}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CapsuleDetail;
