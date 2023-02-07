


// selection  dom element

const counterEl = document.getElementsByClassName('counter')
const incrementBtn = document.getElementById('increment')
const decrementBtn = document.getElementById('decrement')
const counterArea = document.getElementById('counter_area')
const addCounterBtn = document.getElementById('add_counter')
const resetBtn = document.getElementById('resetBtn')

let initialState = []

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 5) + min)
}




// action identifier 

const INCREMENT = 'increment'
const DECREMENT = 'decrement'
const ADDCOUNTER = 'addCounter'
const RESET = 'reset'





//  action creator 

const increment = (id, value) => {

    return {
        type: INCREMENT,
        payload: { value: value, id: id },
    }
}
const decrement = (id, value) => {
    return {
        type: DECREMENT,
        payload: { value: value, id: id },
    }
}

const addCounter = (id, value) => {
    return {
        type: ADDCOUNTER,
        payload: { value: value, id: id },
    }
}

const reset = () => {
    return {
        type: RESET,

    }
}


//    create reducer function 

function counterReducer(state = initialState, action) {

    console.log('reducer', state)



    if (action.type === INCREMENT) {

        const updateState = state.map(x => {
            console.log('map', x)

            const { id, value } = x


            if (x?.id == action.payload?.id) {

                return {
                    ...x,
                    value: x.value + action.payload?.value
                }


            }
            else {
                return { ...x }
            }


        })

        return updateState

    }
    else if (action.type === DECREMENT) {




        const updateState = state.map(x => {
            console.log('map', x)

            const { id, value } = x


            if (x?.id == action.payload?.id) {


                return {
                    ...x,
                    value: x.value - action.payload?.value
                }

            }
            else {
                return { ...x }
            }


        })
        console.log('update state', updateState)
        return updateState


    }

    else if (action.type === 'addCounter') {
        console.log('I am from add')
        const { id, value } = action?.payload


        const div = document.createElement('div')
        div.innerHTML = `   
    
        <div class="text-2xl text-center font-semibold  counter" >${value}</div>
        <div class="flex space-x-3">
            <button onClick=incrementButton(${id}) class="bg-indigo-400 text-white px-3 py-2 rounded shadow"   id="increment">
                Increment
            </button>
            <button  onClick=decrementButton(${id}) class="bg-red-400 text-white px-3 py-2 rounded shadow" id="decrement">
                Decrement
            </button>
        </div>
    
        `
        counterArea.appendChild(div)



        div.firstElementChild.dataset.id = id



        return [...state, { id, value }]


    }
    else if (action.type === 'reset') {
        console.log('I am reset')
        console.log(action?.payload)

        const updateState = state.map(x => {
            return { ...x, value: 0 }
        })

        return updateState



    }
    else {
        return state
    }

}

// redux store 

const store = Redux.createStore(counterReducer);

const render = () => {
    const state = store.getState()

    console.log('finalState', state);
    [...counterEl].forEach(element => {

        state.forEach(s => {
            if (s.id == element.dataset.id) {

                element.innerText = s.value
            }

        })



    })

}



// subscribe  
store.subscribe(render)




// action dispatch 

// incremnet counter value 

const incrementButton = (id) => {

    const value = Math.floor(Math.random() * 10) + 1;
    store.dispatch(increment(id, value))


}

// decremnet counter value 



const decrementButton = (id) => {

    const value = Math.floor(Math.random() * 10) + 1;
    store.dispatch(decrement(id, value))

}

//   add counter 

addCounterBtn.addEventListener('click', () => {



    const id = Date.now()
    const value = randomIntFromInterval(5, 20);

    store.dispatch(addCounter(id, value))



})


// Reset counter 


resetBtn.addEventListener('click', () => {

    store.dispatch(reset())


})

































