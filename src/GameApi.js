export default class GameApi{
    /* Los movimientos disponibles en el juego son obtenidos desde el back*/
    static getMoves() {
        return fetch('http://127.0.0.1:8000/moves')
            .then(res => res.json())
    }
    /* Para guardar el ganador solo se utiliza el nombre, similar a un rankig de juego tipo arcade.
    *  Una mejor versión para guardar al ganador debería considerar alguna manera de almacenar
    *  su identificación (cookie o registro)
    * */
    static sendWinner(winner) {
        return fetch('http://127.0.0.1:8000/winner', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                winner,
            })
        })
    }
    /* Editar movimiento, se permite cambiar el nombre y los movimientos a los que vence*/
    static editMove(move, defeats) {
        const {label, value} = move
        return fetch('http://127.0.0.1:8000/edit/' + value, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                label,
                defeat: defeats.map(m => (m.value))
            })
        })
    }

    /* Crea movimiento, se permite crear nombre y arreglo de movimientos a los que vence*/
    static createMove(move, defeats) {
        const {label} = move
        return fetch('http://127.0.0.1:8000/create/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                label,
                defeat: defeats.map(m => (m.value))
            })
        })
    }

    /* Borrar movimiento */
    static deleteMove(id) {
        return fetch('http://127.0.0.1:8000/delete/' + id)
            .then(res => res.json())
    }
}
