import { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../slices/cart/cartSlice'

// mapStateToProps gives you READ ACCESS
// const mapStateToProps = (state) => {
//   // the state argument is the WHOLE REDUX STORE
//   return {
//     // now in here I'd like to read the name property in the user slice
//     userName: state.user.name,
//   }
//   // let's not add any prop in read-mode here because we don't need them!
//   // we just need to DISPATCH ACTIONS, add a book to the cart!
// }

// mapDispatchToProps is once again a function returning an object
// every element of this object will be a PROP for this component!
// const mapDispatchToProps = (dispatch) => {
//   return {
//     // these props, when invoked, will dispatch actions!
//     // let's give a name to my method, it will be invokable with that name
//     addToCartProp: (book) => {
//       // when this prop is invoked, you'll DISPATCH AN ACTION!
//       dispatch(addToCart(book))
//     },
//     // addToCartProp is callable inside the component from the props!
//     // it's going to be in this.props.addToCartProps()
//   }
// }

const BookDetail = ({ bookSelected }) => {
  // state = {
  //   book: null,
  // }

  const [book, setBook] = useState(null)

  useEffect(() => {
    setBook(bookSelected)
  }, [bookSelected])

  const userName = useSelector((state) => state.user.name)

  const dispatch = useDispatch()

  // componentDidUpdate(prevProps) {
  //   if (prevProps.bookSelected !== this.props.bookSelected) { // <-- we were tracking down a change in bookSelected
  //     this.setState({
  //       book: this.props.bookSelected,
  //     })
  //   }
  // }

  return (
    <div className="mt-3">
      {book ? (
        <>
          <Row>
            <Col sm={12}>
              <h1>{book.title}</h1>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col sm={4}>
              <div className="mt-3">
                <img
                  className="book-cover"
                  src={book.imageUrl}
                  alt="book selected"
                />
              </div>
            </Col>
            <Col sm={8}>
              <p>
                <span className="font-weight-bold">Description:</span>
                {book.description}
              </p>
              <p>
                <span className="font-weight-bold">Price:</span>
                {book.price}
              </p>
              {/* I want to hide the button if the user hasn't logged in yet... */}
              {/* the user will not have logged in yet if the name property in the user slice is still '' */}
              {/* ...so I have to check this.props.userName and check if it's still empty! */}
              {userName ? (
                <Button
                  color="primary"
                  onClick={() => {
                    // in here we should dispatch the action
                    // to trigger the reducer
                    // that will add a book to the content array
                    // addToCartProp(book)
                    dispatch(addToCart(book))
                  }}
                >
                  ADD TO CART
                </Button>
              ) : (
                <div>You need to log in for adding stuff to the cart!</div>
              )}
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          <Col sm={12}>
            <h3>Please select a book!</h3>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default BookDetail

// connect takes up to 2 arguments:
// 1) mapStateToProps <-- giving READ ACCESS to the store
// 2) mapDispatchToProps <-- giving DISPATCHING ABILITIES to this component
