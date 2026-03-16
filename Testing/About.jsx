import React from 'react'
import Navbar from '../components/Navbar';
import '../css/about.css'
import { Link } from 'react-router-dom';
import Aboutvalues from '../components/Aboutvalues';
import {dvalues} from '../data/dabout';
import Aboutteacherdetail from '../components/Aboutteacherdetail';
import {dteacherdetail} from '../data/dabout'
const About = () => {
    return (
        <>
        <div className="abouttop">
            <h1>About Us</h1>
            <h2>Mission & Vision</h2>
            <h3>Vision</h3>
            <p>To be the most trusted partner for career transformation and self-actualization, empowering every individual to discover new possibilities through learning in a rapidly changing era.</p>
            <h3>Mission</h3>
            <p>To bridge the gap between traditional education and workplace practice by providing "ready-to-use" professional courses while balancing personal growth and interest exploration.</p>
        </div>
        <div className="story">
            <div className="left">
                <h2>Our Founding Story</h2>
                <p>In 2018, Mr. Lee Ming-wah founded our academy to fill the gap between traditional learning and workplace needs.</p>
                <p>Thus, we created a revolutionary platform, assembling 20 top industry experts to design "learn-and-apply-immediately" courses tailored specifically for working adults. From digital marketing to leadership mastery, every class targets real workplace pain points with proven solutions.</p>
                <p>Over seven remarkable years, we've empowered 2,500+ students to complete their transformation journey, with an impressive 95% achieving promotions or successful career pivots post-graduation—from accountants becoming UI designers to clerks transforming into digital marketing specialists. Every success story fuels our mission.</p>

            </div>
            <div className="right">
                <div className="img-container">
                    {/* <img src="./fzky.png" alt="" /> */}
                </div>
            </div>
        </div>
        <div className="value">
            <div className="top">
                <h2>Core Values</h2>
                <h3>Practicality</h3>
                <p>We reject empty theories. All courses are taught by industry veterans to ensure students can apply what they learn immediately.</p>
                <h3>Flexibility</h3>
                <p>Designed for busy adults, we offer a hybrid learning model combining online and offline instruction.</p>
                <h3>Connection</h3>
                <p>We build a student community to facilitate cross-industry resource sharing and networking.</p>
            </div>
            <div className="bottom">
                {dvalues.map((item)=>(
                    <Aboutvalues key={item.id}
                    icon = {item.icon}
                    title = {item.title}
                    purpose = {item.purpose}
                    />
                ))}
                {/* <div className="bg">
                    <i className="fa-solid fa-phone"></i>
                    <h3>以學生為中心</h3>
                    <p>每個課程都以學生的實際需求和職業目標為設計出發點。</p>
                </div>
                <div className="bg">
                    <i className="fa-solid fa-phone"></i>
                    <h3>創新教學</h3>
                    <p>採用最新的教學方法和技術，確保課程內容始終與業界同步。</p>
                </div>
                <div className="bg">
                    <i className="fa-solid fa-phone"></i>
                    <h3>專業講師</h3>
                    <p>所有講師都是行業資深專家，具有豐富的實戰經驗。</p>
                </div>
                <div className="bg">
                    <i className="fa-solid fa-phone"></i>
                    <h3>品質保證</h3>
                    <p>嚴格的教學品質控制，確保每位學生都能獲得最佳學習體驗。</p>
                </div> */}
            </div>
        </div>
        <div className="teacher">
            <div className="title">
                <h2>World-Class Faculty</h2>
                <p>An exceptional team of professional instructors dedicated to delivering the highest quality learning experience.</p>
            </div>
            <div className="tea">
                {dteacherdetail.map((item)=>(
                    <Aboutteacherdetail key={item.id}
                        imglink={item.imglink}
                        teaname={item.teaname}
                        teaposition={item.teaposition}
                        experience={item.experience}
                        icon={item.icon}
                        moredetail={item.moredetail}
                    />
                ))}
                {/* <div className="bg">
                    <div className="img-container">
                        <img src="./fzky.png" alt="" />
                    </div>
                    <div className="teadetail">
                        <h2>張老師</h2>
                        <h3>高級教師</h3>
                        <h4>擁有 15 年教育行業經驗</h4>
                        <p className="more-btn">了解更多<i className="fa-solid fa-check"></i></p>
                        <div className="tea-anwser">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eum officia, vero libero quidem ipsa excepturi expedita ullam veniam velit nostrum consectetur. Est autem ipsa necessitatibus repellendus, architecto facere inventore expedita ullam cum ea deleniti nobis alias provident, corrupti accusamus fugiat debitis, sequi cupiditate. Architecto assumenda asperiores est quia, omnis doloremque modi consequatur impedit. A reiciendis recusandae eum velit, repellendus expedita distinctio facilis fugit blanditiis, veniam autem eaque commodi, aspernatur voluptas! Eligendi consequatur repellendus mollitia ex, quis consequuntur vitae a laudantium aliquam enim at assumenda neque voluptatum soluta sequi minima quisquam inventore, vel laboriosam magnam eum, officia itaque accusantium. Dicta!</p>
                        </div>
                    </div>
                </div>
                <div className="bg">
                    <div className="img-container">
                        <img src="./fzky.png" alt="" />
                    </div>
                    <div className="teadetail">
                        <h2>張老師</h2>
                        <h3>初級教師</h3>
                        <h4>擁有 15 年教育行業經驗</h4>
                        <p className="more-btn">了解更多<i className="fa-solid fa-check"></i></p>
                        <div className="tea-anwser">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eum officia, vero libero quidem ipsa excepturi expedita ullam veniam velit nostrum consectetur. Est autem ipsa necessitatibus repellendus, architecto facere inventore expedita ullam cum ea deleniti nobis alias provident, corrupti accusamus fugiat debitis, sequi cupiditate. Architecto assumenda asperiores est quia, omnis doloremque modi consequatur impedit. A reiciendis recusandae eum velit, repellendus expedita distinctio facilis fugit blanditiis, veniam autem eaque commodi, aspernatur voluptas! Eligendi consequatur repellendus mollitia ex, quis consequuntur vitae a laudantium aliquam enim at assumenda neque voluptatum soluta sequi minima quisquam inventore, vel laboriosam magnam eum, officia itaque accusantium. Dicta!</p>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
        <div className="community">
            <h2>Join Our Community</h2>
            <p>Start your learning journey right now with our 2500+ companions </p>
            <Link to="/course">Explore Courses</Link>
        </div>
        </>
    )
}

export default About