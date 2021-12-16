import { Table, Button } from 'react-bootstrap'

function TodoList(props) {
  const todoItems = props.todoItems

  async function handleMarkAsComplete(item) {
    if (props.OnMarkAsComplete || props.OnMarkAsComplete !== undefined) {
      props.OnMarkAsComplete(item)
    }
  }

  if (todoItems.length <= 0) return <h3>No {props.name} to display!</h3>

  function DisplayMarkAsCompleteButton(item) {
    if (!item.isCompleted) {
      return (
        <Button variant="warning" size="sm" onClick={() => handleMarkAsComplete(item)}>
          Mark as completed
        </Button>
      )
    }
  }

  return (
    <>
      <h3>
        {props.name} {todoItems.length}
      </h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todoItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.description}</td>
              <td>{item.isCompleted ? 'Completed' : 'New'}</td>
              <td>{DisplayMarkAsCompleteButton(item)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
export default TodoList
