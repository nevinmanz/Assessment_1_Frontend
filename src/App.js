import './App.css'
import { Image, Alert, Container, Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { addNewTodoItem, getTodoList, updateTodoItem } from './api/TodoApi'
import TodoList from './components/TodoList'
import AddTodoItem from './components/AddTodoItem'
import ErrorMessageDisplayer from './components/ErrorMessageDisplayer.js'

const App = () => {
  const [description, setDescription] = useState('')
  const [todoItems, setTodoItems] = useState([])
  const [errorMessageItem, setErrorMessageItem] = useState([])

  useEffect(() => {
    getItems()
    setDescription('')
    setErrorMessageItem('')
  }, [])

  async function getItems() {
    try {
      const response = await getTodoList()
      if (response.status === 200) {
        setTodoItems(response.data)
      }
    } catch (error) {
      setErrorMessageItem(JSON.stringify(error.response.data))
      console.error(error)
    }
  }

  async function handleAdd() {
    try {
      if (description) {
        const response = await addNewTodoItem({ description })
        console.log(response)
        if (response.status === 200) {
          setDescription('')
          await getItems()
        }
      } else {
        setErrorMessageItem('Description should not be empty')
        return
      }
    } catch (error) {
      setErrorMessageItem(JSON.stringify(error.response.data))
      console.error(error.response)
    }
  }

  function handleClear() {
    setDescription('')
    setErrorMessageItem('')
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
    console.log(e.target.value)
  }

  async function handleMarkAsComplete(item) {
    const updatedItem = { ...item, isCompleted: !item.isCompleted }
    try {
      await updateTodoItem(updatedItem.id, updatedItem)
      await getItems()
    } catch (error) {
      setErrorMessageItem(JSON.stringify(error.response.data))
      console.error(error)
    }
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Image src="clearPointLogo.png" fluid rounded />
          </Col>
        </Row>
        <Row>
          <Col>
            <Alert variant="success">
              <Alert.Heading>Todo List App</Alert.Heading>
              Welcome to the ClearPoint frontend technical test. We like to keep things simple, yet clean so your
              task(s) are as follows:
              <br />
              <br />
              <ol className="list-left">
                <li>Add the ability to add (POST) a Todo Item by calling the backend API</li>
                <li>
                  Display (GET) all the current Todo Items in the below grid and display them in any order you wish
                </li>
                <li>
                  Bonus points for completing the 'Mark as completed' button code for allowing users to update and mark
                  a specific Todo Item as completed and for displaying any relevant validation errors/ messages from the
                  API in the UI
                </li>
                <li>Feel free to add unit tests and refactor the component(s) as best you see fit</li>
              </ol>
            </Alert>
          </Col>
        </Row>
        <Row>
          <Col>
            <AddTodoItem
              OnItemAdd={handleAdd}
              OnItemClear={handleClear}
              OnHandleDescription={handleDescriptionChange}
              Description={description}
            ></AddTodoItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <ErrorMessageDisplayer Item={errorMessageItem} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <TodoList
              todoItems={todoItems}
              name={'Total Todo List Items: '}
              OnMarkAsComplete={handleMarkAsComplete}
            ></TodoList>
          </Col>
        </Row>
      </Container>
      <footer className="page-footer font-small teal pt-4">
        <div className="footer-copyright text-center py-3">
          © 2021 Copyright:
          <a href="https://clearpoint.digital" target="_blank" rel="noreferrer">
            clearpoint.digital
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
