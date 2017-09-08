var Note = React.createClass({
    
	render: function() {
        

        	return (
            
			<div className="note" >
                
			<span className="delete-note" onClick={this.props.onDelete}> x </span>
                
			{this.props.children}
            
			</div>
        
			);
    
}
});


var NoteEditor = React.createClass({
    
	getInitialState: function() {
        
		return {
            
			text: ''
      
  		};
    
	},

    
	handleTextChange: function(event) {
        
		this.setState({ text: event.target.value });
    
	},

    
	handleNoteAdd: function() {
        
		var newNote = {
            
			text: this.state.text,
            
			color: 'gray',
            
			id: Date.now()
        
		};

        
		this.props.onNoteAdd(newNote);
        
		this.setState({ text: '' });
    
	},

    
	render: function() {
        
		return (
            
			<div className="note-editor">
                
				<textarea
 placeholder="Enter your note pls..."
                    
				rows={5}
                    
				className="textarea"
                    
				value={this.state.text}
                    
				onChange={this.handleTextChange}
                
				/>
                
				<button className="add-button" onClick={this.handleNoteAdd}>Add</button>
            
			</div>
        
			);
    
	}

});


	var NotesGrid = React.createClass({
    
		componentDidMount: function() {
       
		var grid = this.refs.grid;
        
		this.msnry = new Masonry( grid, {
            
			itemSelector: '.note',
            
			columnWidth: 200,
            
			gutter: 10,
            
			isFitWidth: true
       
		});
  
	},

    
	componentDidUpdate: function(prevProps) {
        
		if (this.props.notes.length !== prevProps.notes.length) {
            
		this.msnry.reloadItems();
            
		this.msnry.layout();
     
		}
  
	},

    
	render: function() {
        
	var onNoteDelete = this.props.onNoteDelete;

        
		return (
            
			<div className="notes-grid" ref="grid">
               
				{
                    
				this.props.notes.map(function(note){
                        
					return (
                            
						<Note
                                
							key={note.id}
                                
							onDelete={onNoteDelete.bind(null, note)}
                               
							color={note.color}>
                                
							{note.text}
                            
						</Note>
                      
					);
                    
				})
                
				}
            
			</div>
        
		);
    
	}

});


var NotesApp = React.createClass({
    
	getInitialState: function() {
        
		return {
            
			notes: []
        
		};
    
	},

    
   
   
	handleNoteDelete: function(note) {
        
		var noteId = note.id;
        
		var newNotes = this.state.notes.filter(function(note) {
            
		return note.id !== noteId;
       
		});
        
		this.setState({ notes: newNotes });
    
	},

    
	handleNoteAdd: function(newNote) {
        
		var newNotes = this.state.notes.slice();
        
		newNotes.unshift(newNote);
        
		this.setState({ notes: newNotes });
    
	},

    
	render: function() {
        
		return (
            
			<div className="notes-app">
                
				<h2 className="app-header">NotesApp</h2>
               
				<NoteEditor onNoteAdd={this.handleNoteAdd} />
                
				<NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} />
            
			</div>
        
		);
    
	},

   

});


ReactDOM.render(
    
	<NotesApp />,
    
	document.getElementById('my-app')

);