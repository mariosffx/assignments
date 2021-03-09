import React, {useState, useEffect, useMemo} from "react";
import "./App.css";
import styled from "styled-components";
import Message from "./components/Message";
import Tab from "./components/Tab";
import TabLinks from "./components/TabLinks";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import TabActions from "./components/TabActions";

const PlayArea = styled.div`
  padding: 15px;
`
const ResultMessage = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border: 5px solid var(--light);
  border-radius: 10px;
  top: 25vh;
  position: relative;
  width: 50%;
  height: 50%;
  margin: auto;
  text-align: center;
  padding: 50px;
`
const ParagraphMessage = styled.p`
  text-align: center;
`

const Button = styled.button`
  color: var(--light);
  background-color: var(--success);
  padding: 25px;
`


export default function App() {
  const initMessage = {
    status: "info",
    text: "Pick your numbers"
  }
  const initTabs = [
    { id: "01", numbers: [], price: 0.00, ok: false },
    { id: "02", numbers: [], price: 0.00, ok: false },
    { id: "03", numbers: [], price: 0.00, ok: false },
  ]

  const playerName= "Marios A. Toparopoulos"

  const customNumbers = {
    0: "01",
    1: "02",
    2: "03",
    3: "04",
    4: "05",
    5: "06"
  }
  const multipliers = {
    0: 0,
    1: 2,
    2: 4,
    3: 8,
    4: 16,
    5: 24,
    6: 28
  }

  function addTab() {
    if (tabs.length >= 6) {
      setMessage({
        status: "warning",
        text: "Unable to comply, maximum tabs have been reached."
      })
    } else {
      setTabs(oldTabs => {
        const newTabs = [...oldTabs];
        newTabs.push({
          id: customNumbers[newTabs.length],
          numbers: [],
          price: 0.00,
          ok: false
        });
        return newTabs;
      })
    }
  }
  function generateRandomNumbers () {
    const randomNumbers = [];
    for (let i = 1; i <= 6; i++) {
      let randomNumber; 
      do {
        randomNumber = Math.round(Math.random() * 49);
      } while (randomNumbers.includes(randomNumber))
      randomNumbers.push(randomNumber);
    }
    return randomNumbers;
  }
  function random(index) {
    const randomNumbers = generateRandomNumbers();
    setTabs(oldTabs => {
      const newTabs = [...oldTabs];
      newTabs[index].numbers = randomNumbers;
      newTabs[index].price = 1.00;
      newTabs[index].status = "ok";
      return newTabs;
    })
    setMessage({
      status: "random",
      text: `Randomized the following numbers: ${randomNumbers} on Tab ${customNumbers[index]}`
    })
  }

  function clear(index) {
    setTabs((oldTabs => {
      const newTabs = [...oldTabs];
      newTabs[index].numbers = [];
      newTabs[index].price = 0;
      return newTabs;
    }))
    setMessage({
      status: "info",
      text: `Cleared Numbers on Tab ${index}`
    })
  }

  function clearTabs() {
    setTabs([...initTabs]);
    setMessage({
      status: "info",
      text: "Restored default tabs."
    })
  }
  
  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  function toggleNumber(tabID, number) {
    const index = getKeyByValue(customNumbers, tabID);
    setTabs(oldTabs => {
      const newTabs = [...oldTabs]
      const modifiedTab = newTabs[index]
        const numbers = modifiedTab.numbers;
        const indexOfNumber = numbers.indexOf(number);
      if (indexOfNumber === -1) {
        if (numbers.length === 6 ) {
          setMessage({
            status: "warning", 
            text: `You have already chosen 6 numbers on Tab ${tabID}`
          })
        } else {
          numbers.push(number);
          if (numbers.length === 6) {
            setMessage(() => ({
              status: "success",
              text: `Tab ${tabID} OK! Board Price is $1.00`
            }))
            modifiedTab.price = 1.00;
            modifiedTab.status = "ok";
          } else {
            setMessage(() => ({
              status: "info",
              text: `Pick your remaining ${6 - numbers.length} numbers on Tab ${tabID}`
            }))
          }
        }
      } else {
        if (numbers.length === 6) {
          modifiedTab.price = 0.00;  
        }
        numbers.splice(indexOfNumber, 1)
        setMessage(() => ({
          status: "info",
          text: `Number ${number} was removed from Tab ${tabID}`
        }))
      }
      return newTabs;
    })
  }
  function randomAll() {
    setTabs(oldTabs => {
      const newTabs = [...oldTabs];
      newTabs.forEach(tab => {
        tab.price = 1;
        tab.numbers = generateRandomNumbers();
        tab.status = "ok"
      })
      return newTabs
    })
  }
  async function playAll() {
    setTabs(oldTabs => {
      const newTabs = [...oldTabs];
      newTabs.forEach(newTab => {
        if (newTab.numbers.length === 6) {
          newTab.status = "ok"
        } else {
          newTab.status = "error"
        }
      })
      return newTabs;
    })
    const checkTabs = tabs.every(tab => tab.numbers.length === 6)
    if (checkTabs) {
      setMessage({
        status: "success",
        text: "Tabs ok!"
      })
      
      const winningNumbers = tabs.map (tab => 
        tab.numbers.filter(number => 
          jackpot.includes(number)
      ))
      
      let totalCashWon = 0
      let message = "<h1>Your results are:</h1>";
      for (let i = 0; i < winningNumbers.length; i++ ) {
        let winningNumbersText = `<span style="color: orange">you didn't have any winning numbers</span>`
        let cashWonText = ""
        let cashWon = 0
        if (winningNumbers[i].length) {
          cashWon = multipliers[winningNumbers[i].length] * cashMultiplier
          winningNumbersText = `your winning numbers are: ${winningNumbers[i].sort((a, b) => a - b)}`
          cashWonText = `and you won ${cashWon}💲`
          totalCashWon += cashWon;
        }
        message+= `on Tab ${customNumbers[i]} ${winningNumbersText} ${cashWonText}<br/>`
      }
      message += `and the Jackpot numbers were: <span style="color: green">${jackpot.sort((a, b) => a - b)}</span><br/>`
      let oldCash = cash;      
      let remainingCash = oldCash - (totalPrice * cashMultiplier) + totalCashWon
      setCash(remainingCash)
      message += `Total Cash Won: ${totalCashWon}<br />`
      message += `Your remaining cash is: <span style="color: green">${remainingCash.toFixed(2)}</span><br/>`
      if (oldCash > remainingCash) {
        message += `<span>🙏 Better Luck Next Time!!! 🙏</span>`
      } else {
        message += `<span>💲🤑💰 Congratulations!!! 💰🤑💲</span>`
      }

      setResults({
        show: true,
        message: message
      })

    } else {
      setMessage({
        status: "warning",
        text: "Errors found in tabs. Check the tabs with the red dots. (🔴)"
      })
    }
  }

  function handleChange (event) {
    const value = event.target.value;
    setCashMultiplier(value);
    console.log(cashMultiplier);
  }

  function playAgain () {
    setResults({show: false})
  }

  const jackpot = useMemo(() => generateRandomNumbers(), []);
  const [message, setMessage] = useState({ ...initMessage });
  const [tabs,  setTabs] = useState([ ...initTabs  ]);
  const [totalPrice, setTotalPrice ] = useState(0.00);
  const [cash, setCash ] = useState(50.00);
  const [cashMultiplier, setCashMultiplier] = useState(1);
  const [results, setResults ] = useState({show: false})
  useEffect(() => {
    setTotalPrice(() => tabs
      .filter(tab => tab.numbers.length === 6)
      .length
      .toFixed(2)
    )
    
  }, [tabs])

  if (results.show) {
    return (
      <Results message={results.message} playAgain={playAgain} />
  )} else {
    return (
        <Router>
          <Message 
            status={message.status}
            text={message.text} 
          />
          <PlayArea>
            <TabLinks 
              tabs={tabs}
              addTab={addTab}
              randomAll = {randomAll}
              clearTabs={clearTabs}
            />
            <Switch>
              {tabs.map(({id, numbers})=> 
                <Route key={id} path={`/${id}`}>
                  <Tab id={id} numbers={numbers} toggleNumber={toggleNumber} />
                </Route>
              )}
              <Route 
                exact path="/" 
                render={() => { 
                  return (
                    <Redirect to="/01"/>
                  )
                }}
              />
              <Redirect from='*' to='/01' />
            </Switch>
            <TabActions  
              tabs={tabs}
              customNumbers={customNumbers}
              getKeyByValue={getKeyByValue}
              totalPrice={totalPrice} 
              cash={cash}
              playAll={playAll}
              playerName={playerName}
              clear={clear}
              random={random}
              handleChange={handleChange}
            />
          </PlayArea>
        </Router>
      )
  }
}

function createMarkup(html) {
  return {__html: html}
} 

const Results = ({message, playAgain}) => {
  return (
      <ResultMessage>
        <ParagraphMessage dangerouslySetInnerHTML={createMarkup(message)} />
        <Button onClick={playAgain}>Play Again</Button>
      </ResultMessage>
  )
}

