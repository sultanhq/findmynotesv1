import React, { Component } from 'react';
import './App.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
        notes: [{
            title: '',
            text: ''
        }],
        noteList: [],
        isModalOpen: false,
        modalNote: {}
    };
}

handleNoteTitleChange = (idx) => (evt) => {
    const newNotes = this.state.notes.map((Note, nidx) => {
        if (idx !== nidx) return Note;
        return { ...Note,
            title: evt.target.value
        };
    });
    this.setState({
        notes: newNotes
    });
}

handleNoteTextChange = (idx) => (evt) => {
    const newNotes = this.state.notes.map((Note, nidx) => {
        if (idx !== nidx) return Note;
        return { ...Note,
            text: evt.target.value
        };
    });
    this.setState({
        notes: newNotes
    });
}

handleAddNote = () => {
    let idx = this.state.notes.length - 1
    if (this.state.notes[idx].title || this.state.notes[idx].text) {
        this.setState({
            notes: this.state.notes.concat([{title: '',text: ''}]),
            noteList: this.state.notes.concat([])
        });
    } else {
        this.openModal({
            title: "Error",
            text: "Title/Message cannot be blank"
        })
    }
}

handleRemoveNote = (idx) => () => {
    this.setState({
        notes: this.state.notes.filter((note, nidx) => idx !== nidx),
        noteList: this.state.noteList.filter((note, nidx) => idx !== nidx)
    });
}

noteName = (note) => {
    if (!note.title) {
        return ("Untitled Note")
    }
    else {
      return (note.title)
    }
}

renderNotelist = () => {
    if (this.state.noteList.length > 0) {
        return this.state.noteList.map((note, idx) =>
        <div key={idx}> 
          <button style={{ marginBottom: '2px', marginLeft: '5px' }}onClick={() => this.openModal(note)}>{this.noteName(note)}</button>
          <button type="button" style={{ marginLeft: '5px' }} onClick={this.handleRemoveNote(idx)} className="small">🗑 </button>
        </div>)
    } else {
        return (
            <div>
              <p>No notes yet :-(</p>
            </div>
        )
    }
};

openModal(note) {
    this.setState({
        isModalOpen: true,
        modalNote: note
    })
}

closeModal() {
    this.setState({
        isModalOpen: false,
        modalNote: ""
    })
}

render() {
  let idx = this.state.notes.length - 1  
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Find My Notes</h2>
        </div>
        <p className="App-intro">
          To get started, add a note below
        </p>
        <div className="Notes" key={idx} >
              <input
                style={{borderColor: "grey"}}
                type="text"
                placeholder={`Enter Title`}
                value={this.state.notes[idx].title}
                onChange={this.handleNoteTitleChange(idx)}
              />
              <input
                style={{borderColor: "grey", marginBottom: '2px', marginLeft: '5px' }}
                type="text"
                placeholder={`Enter message`}
                value={this.state.notes[idx].text}
                onChange={this.handleNoteTextChange(idx)}
              />
            </div>
          <button type="button" onClick={this.handleAddNote} className="small">Create Note</button>
          <div style={{ marginTop: '5px' }} >
            <hr/>
            {this.renderNotelist()}
            <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
                    <h3>{this.state.modalNote.title}</h3>
                    <p>{this.state.modalNote.text}</p>
                    <p><button onClick={() => this.closeModal()}>Close</button></p>
            </Modal>
          </div>
      </div>
    );
  }
}
class Modal extends React.Component {
  render() {
      if (this.props.isOpen === false)
          return null

      let modalStyle = {
          position: 'absolute',
          top: '50%',
          left: '50%',
          padding: '10px',
          transform: 'translate(-50%, -50%)',
          zIndex: '9999',
          background: '#fff',
          textAlign: 'center',
          borderRadius: '10px'
      }

      let backdropStyle = {
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: '0px',
          left: '0px',
          zIndex: '9998',
          background: 'rgba(0, 0, 0, 0.3)'
      }

      return (
          <div>
      <div style={modalStyle}>
        {this.props.children}
      </div>
      <div style={backdropStyle} onClick={e => this.close(e)}/>
    </div>
      )
  }

  close(e) {
      e.preventDefault()

      if (this.props.onClose) {
          this.props.onClose()
      }
  }

}
export default App;
