export interface ButtonProps {
    onClick: () => void;
    className: string;
}

const StartButton = ({ onClick, className }: ButtonProps) => {
    return (
        <button className={className} onClick={onClick}>
            시작하기
        </button>
    );
};
export default StartButton;