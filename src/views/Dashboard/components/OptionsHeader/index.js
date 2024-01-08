
import styles from "./optionsHeader.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);


const OptionsHeader = ({
    rightSideOptions,
    rightSideOnChange = null,
    leftSideOptions = null
}) => {
    return (
        <div className={cx("options")}>
            <td className={cx("opt-left")}>
                <span href="#">Overview</span>

            </td>
            <td className={cx("opt-right")}>
                <select onChange={(e) => rightSideOnChange(e.target.value)}>
                    {rightSideOptions.map((option, index) => {
                        return <option key={index} value={option.value
                        }
                        >{option.text}</option>
                    }
                    )}
                </select>
            </td>
        </div>
    )
}

export default OptionsHeader;