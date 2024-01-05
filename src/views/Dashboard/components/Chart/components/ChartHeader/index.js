import styles from "./chartHeader.module.scss";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { useState } from "react";
const cx = classNames.bind(styles);
const ChartHeader = ({
    chartOptions,
    onOptionChange = null
}) => {
    const [selectedOption, setSelectedOption] = useState(chartOptions[0])
    useEffect(() => {
        if (onOptionChange) {
            onOptionChange(selectedOption)

        }
    }, [selectedOption])
    return (
        <div className={cx("chart-header")}>
            <div className={cx("left")}>
                <a>Retail overview</a>
            </div>
            <div className={cx("right")}>
                {chartOptions.map((option, index) => (
                    <button
                        key={index}
                        className={cx("chart-option", { "selected": selectedOption.value === option.value })}
                        onClick={() => setSelectedOption(option)}
                    >
                        {option.text}
                    </button>
                ))}
            </div>

        </div>
    )
}

export default ChartHeader;