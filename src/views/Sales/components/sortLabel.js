import styles from "../sales.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function SortLabel({ label, onClick, value }) {
    return (
        <td className={cx("label")} key={value}>{label}
            <button onClick={onClick}
                style={{ display: "none" }}
            >
                <svg className={cx("sort-icon")} xmlns="http://www.w3.org/2000/svg" height="10" width="10" viewBox="0 0 320 512">
                    <path opacity="1" fill="#1E3050" d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z" />
                </svg>
            </button>
        </td>);
}
export default SortLabel;