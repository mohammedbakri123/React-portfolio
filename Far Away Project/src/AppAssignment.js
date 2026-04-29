import {useState} from "react"
function App() {
      const [Steps , setSteps] = useState(10);
      const [Counter , setCounter] = useState(1);
      const date = new Date();
      date.setDate(date.getDate() + Counter);
      

    return(
        <div className="AssignmentForm">
            <div className="Range">
                <input type="range" min='0' max='10' value={Steps} onChange={e=>setSteps(e.target.value)}></input>
                <p>{Steps}</p>
            </div>
            <div className="field">
            <button onClick={() => setCounter(c => c+Steps)}>➕</button>
            <input value={Counter} onChange={e=> setCounter(e.target.value)}></input>
            <button onClick={() => setCounter(c => c-Steps)}>➖</button>
            </div>
           <div className="Date">
             <p>
                {
                    Counter === 0?
                    "To Day is":
                    Counter>0?
                    `${Counter} days From today is`:
                    `${Counter} days ago was`
                }
                <span>{` ${date.toDateString()}`}</span>
            </p>
           </div>
                <button>Reset</button>

        </div>)
}
export default App;

