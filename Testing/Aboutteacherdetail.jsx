import React from 'react'

const Aboutteacherdetail = ({imglink,teaname,teaposition,experience,icon,moredetail}) => {
    return (
        <div className="bg">
            <div className="img-container">
                <img src={imglink} alt="" />
            </div>
            <div className="teadetail">
                <h2>{teaname}</h2>
                <h3>{teaposition}</h3>
                <h4>{experience}</h4>
                <p className="more-btn">Know more about our teachers<i className={icon}></i></p>
                <div className="tea-anwser">
                    <p>{moredetail}</p>
                </div>
            </div>
        </div>
    )
}

export default Aboutteacherdetail