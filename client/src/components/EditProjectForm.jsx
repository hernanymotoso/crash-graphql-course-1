import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_PROJECT } from '../queries/project.queries';
import { UPDATE_PROJECT } from '../mutations/project.mutations';

const statusData = {
  'Not Started': 'new',
  'In Progress': 'progress',
  'Completed': 'completed'
};

export default function EditProjectForm({ project }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(project.status);  

  console.log('project.status', project.status);

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status: statusData[status]},
    refetchQueries: [{query: GET_PROJECT, variables: { id: project.id }}],
  });


  function onSubmit(e) {
    e.preventDefault();

    if(!name || !description || !status) {
        return alert('Please fill out all fields');
    }

    updateProject(name, description, statusData[status]);
  }

  return (
    <div className='mt-5'>
        <h3>Update Project Details</h3>

        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label className="form-label">Name</label>

                <input id="name" type="text" className="form-control"  value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            
            <div className="mb-3">
                <label className="form-label">Description</label>

                <textarea id="description" className="form-control"  value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>

            <div className="mb-3">
                <label className="form-label">Status</label>

                <select id='status' className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Not Started">Not Started</option>   
                    <option value="In Progress">In Progress</option>   
                    <option value="Completed">Completed</option>   
                </select>      
            </div>

            <button type='submit' className="btn btn-primary">
                Submit
            </button>
        </form>
    </div>
  )
}
