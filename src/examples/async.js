import { Component } from 'react';
import { Card, CardBody, CardFooter } from 'reactstrap'

export class Async extends Component {
  state = {
    number: 1,
    object: {
      id: 1,
      name: 'teste',
    },
    boolean: true,
    cliques: 0,
  }

  reset = () => {
    this.setState({
      number: 1,
      object: {
        id: 1,
        name: 'teste',
      },
      boolean: true,
      cliques: 0,
    })
  }

  AsyncAdd = () => {
    // Para evitar problemas com tarefas assincronas, utiliza o prevState
    // recomendado pra alterar states booleans, fazer somas, contadores.
    setTimeout(() => {
      this.setState(prevState => ({
        number: prevState.number + 1,
        object: {
          ...prevState.object,
          name: 'teste ' + (prevState.number + 1), // Alterando somente o name sem perder os dados anteriores
        },
        boolean: !prevState.boolean, // Alterando o boolean
        cliques: prevState.cliques + 1,
      }))
    }, 1000)
  }

  SyncAdd = () => {
    /*
      * Ao clicar repetidas vezes, o método não vai inserir as tarefas em fila,
      * gerando erros no resultado final.
      * Para metodos que precisam alterar o state, com base no seu valor passado, utiliza como
      * no exemplo acima
    */
    const { number, object, boolean, cliques } = this.state
    this.setState({
      cliques: cliques + 1,
    })
    setTimeout(() => {
      this.setState({
        number: number + 1,
        object: {
          ...object,
          name: 'teste ' + number,
        },
        boolean: !boolean,
      })
    }, 1000)
  }

  render() {
    const { number, object, boolean, cliques } = this.state

    return (
      <Card>
        <CardBody>
          Número: { number } <br />
          Objeto: { JSON.stringify(object) } <br />
          Boolean: { boolean ? 'true' : 'false' } <br />
          Cliques: { cliques } <br />
        </CardBody>
        <CardFooter>
          <button onClick={this.AsyncAdd} className="btn btn-secondary">
            Clique repetidamente (async example)
          </button>

          <button onClick={this.SyncAdd} className="btn btn-secondary">
            Clique repetidamente (sync example)
          </button>
          <button onClick={this.reset} className="btn btn-secondary">
            Reset
          </button>
        </CardFooter>
      </Card>
    );
  }
}

export default Async;