import { useEffect } from "react";

function VerifyFormInput({num, codes, setCodes, refs, handleInputFocus, curr, setCurr,}: {num : string, codes : any, setCodes : (codes : any) => any, refs:any, handleInputFocus : any, curr: number, setCurr: any,}) {  

    useEffect(() => {
        handleInputFocus(refs[curr]);
    }, [curr]);
      
    function handleOnChange(e : any) {

        if(parseInt(e.target.value)){
            setCodes({
                ...codes,
                [num] : e.target.value
            });
            
            
            setCurr(curr + 1)
        }
    };

    return(
        <div className="mx-1 sm:mx-3 h-10 sm:h-9  sm:h-10.5 border-2 object-contain rounded-xl">
            <input ref={refs[parseInt(num)]} className={` ${curr === parseInt(num) ? 'border-2 border-blue-500' : ''} w-full h-full object-contain outline-none bg-current-col text-center font-bold border-blue-600 focus:caret-transparent rounded-xl`} type="text" value={codes[num]} onChange={handleOnChange} name={`code-${num}`} id={`code-${num}`} maxLength={1} disabled={curr !== parseInt(num)} />
        </div>
    );
};
export default VerifyFormInput;
