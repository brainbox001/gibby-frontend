import { useState, useEffect} from "react";
import HomeMainDiv from "./HomeMainDiv";

import Footer from "./Footer";

interface HomeData {
    header : {head : string, 'first-sub-head' : string, 'second-sub-head' : string};
    'second-div' : any;
}

function Home() {
    
    const [data, setData] = useState<HomeData | null>(null);

    useEffect(() => {
        document.title = 'Gibby - Save to achieve goals';
        document.body.style.background = "#ebf1fa";

        const fetchData = async () => {

        const controller = new AbortController();
        const { signal } = controller;
    
        try {
            const response = await fetch('/homePage.json', { signal });
            
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
    
            const jsonData = await response.json();
            setData(jsonData);
            
        } catch (error : any) {
            console.log(error);
        }
    
        return () => {

            controller.abort();
        };
        };
    
        fetchData();
    }, []);
    return (
        <div className="font-sans text-xl custom-home mt-16">
            {data &&
                (<>
                    <HomeMainDiv classes={'lg:grid lg:grid-cols-2 lg:place-items-center'}>
                        <div className="lg:mr-4">
                        <div className="text-4xl sm:text-5xl text-blue-600 font-extrabold mb-3">{data.header.head}</div>
                        <span className="text-green-600 font-semibold sm:text-2xl">{data.header['first-sub-head']}</span>
                        </div>
                        <div className="mb-4 mt-3">
                            <img className="border-2 border-white rounded-4xl" src="/header-img.png" alt="header-img" />
                        </div>
                        <div className="my-4 font-bold sm:text-xl text-sm lg:col-span-2">{data.header['second-sub-head']}</div>
                    </HomeMainDiv>
                    <HomeMainDiv>
                            <div className="text-center font-bold text-4xl mb-3">{data["second-div"].head}</div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3
                             second-div-custom">
                            <div className="text-center animate-grid-divs" style={{animationDelay : "4s"}}>
                                <div className="font-bold text-3xl my-3">{data["second-div"]["sub-body-1"].head}</div>
                                <div className="text-2xl">{data["second-div"]["sub-body-1"].body}</div>
                            </div>
                            <div className="text-center animate-grid-divs" style={{animationDelay : "8s"}}>
                                <div className="font-bold text-3xl my-3">{data["second-div"]["sub-body-2"].head}</div>
                                <div className="text-2xl">{data["second-div"]["sub-body-2"].body}</div>
                            </div>
                            <div className="text-center animate-grid-divs" style={{animationDelay : "11s"}}>
                                <div className="font-bold text-3xl my-3">{data["second-div"]["sub-body-3"].head}</div>
                                <div className="text-2xl">{data["second-div"]["sub-body-3"].body}</div>
                            </div>
                            </div>
                    </HomeMainDiv>
                    <HomeMainDiv>
                        <div className="font-bold text-4xl mt-3">Trusted By</div>
                        <div className="flex">
                            <img className="max-w-14" src="/sterling-logo.png" alt="sterling-image" />
                            <img className="max-w-14" src="/uba-logo.png" alt="uba-image" />
                        </div>
                    </HomeMainDiv>

                    <Footer customClass="!mx-0" />
                    </>
                )
            }
        </div>
    )
}
export default Home;
