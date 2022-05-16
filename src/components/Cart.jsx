import Button from 'react-bootstrap/Button'
import { FaTrash } from 'react-icons/fa'
import { Col, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart } from '../slices/cart/cartSlice'

const Cart = () => {
  // here I will use my hooks!
  const cartContent = useSelector((state) => state.cart.content)

  const dispatch = useDispatch()

  return (
    <Row>
      <Col sm={12}>
        <ul style={{ listStyle: 'none' }}>
          {cartContent.map((book, i) => (
            <li key={i} className="my-4">
              <Button
                variant="danger"
                onClick={() => dispatch(removeFromCart(i))}
              >
                <FaTrash />
              </Button>
              <img
                className="book-cover-small"
                src={book.imageUrl}
                alt="book selected"
              />
              {book.title}
            </li>
          ))}
        </ul>
      </Col>
      <Row>
        <Col sm={12} className="font-weight-bold">
          TOTAL:{' '}
          {cartContent.reduce(
            (acc, currentValue) => acc + parseFloat(currentValue.price),
            0
          )}
        </Col>
      </Row>
    </Row>
  )
}

export default Cart

// let's connect Cart to the redux store! do we need to READ from it (mapStateToProps) or do we need to DISPATCH ACTIONS (mapDispatchToProps)?
