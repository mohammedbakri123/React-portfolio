import {useState} from "react"

function App(){
    const [Billprice , setBillprice] = useState(0);
    const [tip, settip] = useState(0);
    const [friendTip , setFriendTip] = useState(0);
return(
   <div>
    <BillPrice price={Billprice} SetPrice={setBillprice} />
    <Tip Tip={tip} SetTip={settip} >How did you like the service</Tip>
    <Tip Tip={friendTip} SetTip={setFriendTip}>How did you like the service</Tip>
    <Totalbill price={Billprice} tip1={tip} tip2={friendTip}  />
    <Reset resetPrice={setBillprice} resetTip1={settip}  resetTip2={setFriendTip} />
   </div>

)

}

function BillPrice({price,SetPrice}){

    return(
        <div>
            <p>
                how much was the Bill
            </p>
            <input placeholder="enter price ..." value={price} onChange={e=> SetPrice(e.target.value)}></input>
        </div>
    )
}

// function YourTip({Tip , SetTip}){
//     return(
//         <div>
//             <p>How did you like the service</p>
//             <select value={Tip} onChange={e=> SetTip(e.target.value)}>
//                 <option value={0}>Dissatisfied</option>
//                 <option value={5}>It Was Okay</option>
//                 <option value={10}>It Was Good</option>
//                 <option value={20}>It Was Amazing</option>
//             </select>
//         </div>
//     )
// }

// function FriendTip({Tip , SetTip}){
//     return(
//         <div>
//             <p>How did your Friend like the service</p>
//             <select value={Tip} onChange={e=> SetTip(e.target.value)}>
//                 <option value={0}>Dissatisfied</option>
//                 <option value={5}>It Was Okay</option>
//                 <option value={10}>It Was Good</option>
//                 <option value={20}>It Was Amazing</option>
//             </select>
//         </div>
//     )
// }

function Tip({Tip , SetTip, children}){
        return(
        <div>
            <p>{children}</p>
            <select value={Tip} onChange={e=> SetTip(e.target.value)}>
                <option value={0}>Dissatisfied</option>
                <option value={5}>It Was Okay</option>
                <option value={10}>It Was Good</option>
                <option value={20}>It Was Amazing</option>
            </select>
        </div>
    )
}
function Totalbill({price , tip1 , tip2}){
const Tip1 = tip1===0?0: price * (tip1/100);
const Tip2 = tip2===0?0: price* (tip2/100);
const TotalTips = +Tip1+Tip2;
const TotalPrice = +price + TotalTips;

    return (
        <p>You pay {TotalPrice}$ : ({+price}$ + {TotalTips}$ Tips)</p>
    )

}
function Reset({resetPrice , resetTip1 , resetTip2}){

    function HandleReset(){
        resetPrice(0);
        resetTip1(0);
        resetTip2(0);
    }
    
    return <button onClick={HandleReset}>Reset</button>
}

export default App;