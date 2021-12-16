import { Button, Container, Row, Col, Form, Stack } from 'react-bootstrap'

function AddTodoItem(props) {
  function handleAdd() {
    if (props.OnItemAdd || props.OnItemAdd !== undefined) {
      props.OnItemAdd(props.Description)
    }
  }

  function handleClear() {
    if (props.OnItemClear || props.OnItemClear !== undefined) {
      props.OnItemClear(props.Description)
    }
  }

  return (
    <Container>
      <h1>Add Item</h1>
      <Form.Group as={Row} className="mb-3" controlId="formAddTodoItem">
        <Form.Label column sm="2">
          Description
        </Form.Label>
        <Col md="6">
          <Form.Control
            type="text"
            placeholder="Enter description..."
            value={props.Description}
            onChange={props.OnHandleDescription}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3 offset-md-2" controlId="formAddTodoItem">
        <Stack direction="horizontal" gap={2}>
          <Button variant="primary" onClick={() => handleAdd()}>
            Add Item
          </Button>
          <Button variant="secondary" onClick={() => handleClear()}>
            Clear
          </Button>
        </Stack>
      </Form.Group>
    </Container>
  )
}

export default AddTodoItem
