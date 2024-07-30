import { Box, Button, Typography, Divider, TextField, IconButton, Card } from '@mui/material'
import { useEffect, useState, Component } from 'react'
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
// import sectionApi from '../../api/sectionApi'
// import taskApi from '../../api/taskApi'
// import TaskModal from './TaskModal'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';


let timer
const timeout = 500

const KanbanTable = () => {
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState([])

    useEffect(() => {
        setItems(getItems(10))
        setSelected(getItems(getItems(5, 10)))

    }, [])


    // fake data generator
    const getItems = (count, offset = 0) =>
        Array.from({ length: count }, (v, k) => k).map(k => ({
            id: `item-${k + offset}`,
            content: `item ${k + offset}`
        }));
    
    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    };
    
    /**
     * Moves an item from one list to another list.
     */
    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);
    
        destClone.splice(droppableDestination.index, 0, removed);
    
        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;
    
        return result;
    };
    
    const grid = 8;
    
    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
    
        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey',
    
        // styles we need to apply on draggables
        ...draggableStyle
    });
    
    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        padding: grid,
        width: 250
    });

    const getList = () => {
    
        // getList = id => this.state[this.id2List[id]];
    }

    const onDragEnd = () => {
        // onDragEnd = result => {
        //     const { source, destination } = result;
    
        //     // dropped outside the list
        //     if (!destination) {
        //         return;
        //     }
    
        //     if (source.droppableId === destination.droppableId) {
        //         const items = reorder(
        //             this.getList(source.droppableId),
        //             source.index,
        //             destination.index
        //         );
    
        //         let state = { items };
    
        //         if (source.droppableId === 'droppable2') {
        //             state = { selected: items };
        //         }
    
        //         this.setState(state);
        //     } else {
        //         const result = move(
        //             this.getList(source.droppableId),
        //             this.getList(destination.droppableId),
        //             source,
        //             destination
        //         );
    
        //         this.setState({
        //             items: result.droppable,
        //             selected: result.droppable2
        //         });
        //     }
        // };
    
    }

    const id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };
    

    
        
            return (
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {this.state.items.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                {item.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="droppable2">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {this.state.selected.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                {item.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            );
        }
    
    
    

export default KanbanTable