import { useCollection } from '../../hooks/useCollection'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { timestamp } from '../../firebase/config'

// components
import ProjectList from '../../components/ProjectList'
import ProjectFilter from './ProjectFilter'
import { ToastContainer, toast } from 'react-toastify';


// styles
import './Dashboard.css'
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
  const { user } = useAuthContext()
  const { documents, error } = useCollection('projects')
  const [filter, setFilter] = useState('all')
  let isAssigned = false
  let latestDueDate = 0
  let minDiff = 100000000
  const changeFilter = (newFilter) => {
    setFilter(newFilter)
  }
  

  
  const projects = documents ? documents.filter(document => {
    // console.log(document)
    switch(filter) {
      case 'all':
        document.assignedUsersList.forEach(u => {
          if(u.id === user.uid) {
            isAssigned = true
            latestDueDate = document.dueDate.seconds
            let currDate = timestamp.fromDate(new Date()).seconds
            let diff = 100000000
            if(latestDueDate>=currDate)
            {
              
              diff = Math.ceil((latestDueDate - currDate)/(60 * 60 * 24))
              if(minDiff>diff)
              {
                minDiff = diff
                
              }
              console.log(diff,minDiff)
              
            }
            else{
              diff = Math.ceil((latestDueDate - currDate)/(60 * 60 * 24))
              if(minDiff>diff)
              {
                minDiff = diff
              }
            }
          }
        })
        
        return true
      case 'mine':
        let assignedToMe = false
        document.assignedUsersList.forEach(u => {
          if(u.id === user.uid) {
            assignedToMe = true
          }
        })
        return assignedToMe
      case 'development':
      case 'design':
      case 'sales':
      case 'marketing':
        console.log(document.category, filter)
        return document.category === filter
      default:
        return true
    }
  }) : null

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectFilter changeFilter={changeFilter} />}
      {projects && <ProjectList projects={projects} />}
      {useEffect(()=>{
        if(isAssigned)
        {
          if(minDiff>1)
          toast(`You have a Task due in ${minDiff} days`)
          if(minDiff==1)
          toast.warning(`You have a Task due Tomorrow`)
          if(minDiff==0)
          toast.warning(`You have a Task due Today`)
          if(minDiff==-1)
          toast.error(`Your Task was due yesterday!!`)
          if(minDiff<-1)
          toast.error(`Your Task was due ${-minDiff} days ago!!`)
        }
        isAssigned = false
      },[isAssigned])}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}