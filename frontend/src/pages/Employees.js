import '../index.css';
import Employee from '../components/Employee';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddEmployee from '../components/AddEmpolyee'
import EditEmployee from '../components/EditEmpolyee';


function Employees() {
  const [role, setRole] = useState('dev')
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Uzo',
      role: 'Developer',
      img: 'https://images.pexels.com/photos/6457511/pexels-photo-6457511.jpeg'
    },
    {
      id: 2,
      name: 'Lidia',
      role: 'Developer',
      img: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?'
    },
    {
      id: 3,
      name: 'Zoraya',
      role: 'Developer',
      img: 'https://images.pexels.com/photos/764529/pexels-photo-764529.jpeg?'
    },
    {
      id: 4,
      name: 'Christian',
      role: 'Developer',
      img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?'
    },
    {
      id: 5,
      name: 'Miguel',
      role: 'Developer',
      img: 'https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg?'
    }
  ]);

  function updateEmployee(id, newName, newRole) {
    const updatedEmployees = employees.map((employee) => {
      if(id == employee.id){
        return { ...employee, name: newName, role: newRole};
      }
      return employee;
      
    });
    setEmployees(updatedEmployees);
  }

  function newEmployee(name, role, img){
    const newEmployee = {
      id: uuidv4(),
      name: name,
      role: role,
      img: img,
    };
    setEmployees([...employees, newEmployee]);
  }

  const showEmployees = true;
  return (
    <div className="">
      {showEmployees ? (
      <>
       <div className='flex flex-wrap justify-center'>
        {employees.map((employee) => {
            const editEmployee = <EditEmployee 
            id={employee.id} 
            name={employee.name}  
            role={employee.role} 
            updateEmployee={updateEmployee}
          />
          return(
            <Employee
            key={employee.id}
            id={employee.id}
            name={employee.name}
            role={employee.role}
            img={employee.img}
            editEmployee={editEmployee}
            />
          );
        })}
       </div>
       <AddEmployee newEmployee={newEmployee} />
      </>
    )  :  (    
        <p>Não pode ver os employees</p>
 ) }
    </div>
  );
}

export default Employees;
