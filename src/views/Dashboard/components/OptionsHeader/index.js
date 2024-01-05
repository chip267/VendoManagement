
import styles from "./optionsHeader.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);


const OptionsHeader = ({
    rightSideOptions,
    leftSideOptions = null
}) => {
    return (
        <div className={cx("options")}>
            <td className={cx("opt-left")}>
                <span href="#">Overview</span>

            </td>
            <td className={cx("opt-right")}>
                <select>
                    {rightSideOptions.map((option, index) => {
                        return <option key={index} value={option.value}>{option.text}</option>
                    }
                    )}
                </select>
            </td>
        </div>
    )
}

export default OptionsHeader;