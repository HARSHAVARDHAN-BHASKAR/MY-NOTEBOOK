import Note from "../model/note.js";
export async function getNote (req,res){
   try {
    const notes=await Note.find().sort();
    res.status(200).json(notes);
    
   } catch (error) {
    console.error("Error in getNote controller", error);
    res.status(500).json({message:"Internal server error"});
   }
}

export async function getNoteById (req,res){
    try {
        const {title,content}=req.body;
     const notesId=await Note.findById(req.params.id);
     if(!notesId) return res.status(404).json({message:"Note not found"});
     res.status(200).json(notesId);
     
    } catch (error) {
     console.error("Error in getNoteById controller", error);
     res.status(500).json({message:"Internal server error"});
    }
 }

export async function createNote (req,res){
   try {
    const {title,content}=req.body;
    const newNote=new Note({title,content})

    const create=await newNote.save()
    res.status(201).json(create);
    
   } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({message:"Internal server error"});
   }
}

export async function updateNote (req,res){
    try {
        const {title,content}=req.body;
       const updatedNote= await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true});
if(!updatedNote)return res.status(404).json({message:"Note not found"});

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNote controller", error);
    res.status(500).json({message:"Internal server error"});
    }
}

export async function deleteNote (req,res){
    try {
        const {title,content}=req.body;
        const deletedNote= await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message:"Note not found"});
        res.status(200).json(deletedNote);
    } catch (error) {
        console.error("Error in deleteNote controller", error);
    res.status(500).json({message:"Internal server error"});
    }
}