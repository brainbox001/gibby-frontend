import { Link } from "react-router-dom";

function Footer({customClass} : {customClass? : string}) {
    return(

        <div className={`${customClass} bg-decent-black bottom-0 pb-4 mt-14`}>
        <div className="grid grid-cols-2 gap-3 mx-4 text-white sm:grid-cols-3">
            <div className="flex flex-col mt-4">
                <div className="font-bold opacity-75">Get to know us</div>
                <Link className="font-medium opacity-50" to='/about'>About Gibby</Link>
                <Link className="font-medium opacity-50" to='/blog'>Blog</Link>
                <Link className="font-medium opacity-50" to='/faqs'>FAQs</Link>
                <Link className="font-medium opacity-50" to='/about'>Start saving</Link>
            </div>
            <div className="flex flex-col mt-4">
                <div className="font-bold opacity-75">Legal</div>
                <Link className="font-medium opacity-50" to='/terms'>Terms</Link>
                <Link className="font-medium opacity-50" to='/privacy'>Privacy</Link>
                <Link className="font-medium opacity-50" to='/disclaimer'>Disclaimer</Link>
            </div>
            <div className="third-div col-span-2 sm:col-span-1 sm:mt-4 text-center">
                <div className="font-bold font-bold opacity-75">Get in touch</div>
                <div className="font-medium opacity-50">Gibby HQ, 15b gibby street,</div>
                <div className="font-medium opacity-50">Eket, Akwa Ibom state, Nigeria</div>
                <div className="font-medium opacity-50">momsdboy@gmail.com</div>
                <div className="font-medium opacity-50">+2348168958556</div>
            </div>
        </div>
        </div>
    )
}
export default Footer;