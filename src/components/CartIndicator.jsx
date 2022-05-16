import Button from 'react-bootstrap/Button'
import { FaShoppingCart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Alert, Form, FormControl, Spinner } from 'react-bootstrap'
import { useState } from 'react'
import { changeUsername } from '../slices/user/userSlice'

// useSelector and useDispatch are going to be used once again for connecting a component to the Redux Store
// they are part of react-redux, the bindings library for react
// useSelector and useDispatch will NOT enrich your component with additional props!
// I said that connect creates a HOC (higher order component), so a component with MORE PROPS than normal: this is NOT
// going to happen with useSelector and useDispatch

// mapStateToProps is a function that returns an object

// mapDispatchToProps allows you to define props that, once invoked, will dispatch actions!

const mapDispatchToProps = (dispatch) => {
  // mapDispatchToProps is for DISPATCHING ACTIONS from your component
  // "write" access
  // this function exists for linking the dispatching capabilities to the props of this components
  return {
    changeUsernameProp: (name) => {
      dispatch(changeUsername(name))
    },
  }
}

// REMEMBER THE RULES OF HOOKS:
// 1) use react hooks just in REACT FUNCTIONAL COMPONENTS <-- checked
// 2) use react hooks just AT THE TOP LEVEL of the component, outside of any loop, function, conditional, etc.

const CartIndicator = () => {
  const navigate = useNavigate()

  const [inputValue, setInputValue] = useState('')

  const cartLength = useSelector((state) => state.cart.content.length)
  // cartLength is not a prop anymore! we're declaring it INSIDE the component
  // useSelector is called in this way because we're SELECTING out the redux store the value we want to read
  const userName = useSelector((state) => state.user.name)
  const areBooksLoading = useSelector((state) => state.book.loading)
  const areBooksCrashed = useSelector((state) => state.book.error)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(
      "let's send the inputValue to the redux store to make the user log in!"
    )
    // now how can we send the inputValue, my name, to the redux store? DISPATCHING AN ACTION
    // I want to dispatch changeUsername from here! I'll dispatch the action with inputValue
    // changeUsernameProp(inputValue)
  }

  return (
    <div className="ml-auto mt-2 d-flex">
      {areBooksLoading && <Spinner variant="success" animation="border" />}
      {areBooksCrashed ? (
        <Alert variant="danger">FETCH ERROR :(</Alert>
      ) : userName ? (
        <Button color="primary" onClick={() => navigate('/cart')}>
          <FaShoppingCart />
          <span className="ml-2">{cartLength}</span>
        </Button>
      ) : (
        <Form onSubmit={handleSubmit}>
          <FormControl
            placeholder="Log in here"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Form>
      )}
    </div>
  )
}

export default CartIndicator
// we're ENRICHING the export of CartIndicator through connect
// connect is CONNECTING a component to the REDUX STORE
// at the end of the day, CartIndicatore receives MORE props than just the ones it's receiving from its parent

// connect()() -> is creating a HOC <- Higher Order Component --> ?? it's a component with MORE PROPS than the ones he started with

// the connect function connects a component to the Redux Store in order to read its value or in order to dispatch an
// action that will trigger a change

// we need to tell CartIndicator:
// a) which properties to READ from the redux store <-- mapStateToProps
// b) and which ACTIONS to dispatch <-- mapDispatchToProps

// mapStateToProps MAPS some Redux store value to our PROPS
// mapDispatchToProps MAPS some dispatching abilities to our PROPS

// in CartIndicator we're just interested in READING properties from the redux store! we just need a)
