import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import './own_design.css'

function App() {
  const [valeurInput, setValeurInput] = useState('');

  const gererChangement = (event) => {
    setValeurInput(event.target.value);
  };

  const gererSubmit = () => {
    document.getElementById('my_modal_1').showModal()
  };

  return (
  <>
    <div class="main">
      <h1 class="text-center titre">TODO-LIST</h1>
      <label class="input validator">
      <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="5" height="5" rx="1" ry="1" />
          <path d="M4 7.5l1 1 2-2" />
          <line x1="10" y1="7.5" x2="21" y2="7.5" />
          <rect x="3" y="14" width="5" height="5" rx="1" ry="1" />
          <line x1="10" y1="16.5" x2="21" y2="16.5" />
        </g>
      </svg>

      <input
        type="text"
        required
        placeholder="Task to Do ..."
        pattern="[A-Za-z][A-Za-z0-9\- ]*"
        minlength="5"
        maxlength="30"
        value={valeurInput}
        onChange={gererChangement}
        title="Only letters, numbers or dash"
      />
      </label>
      <button className="btn btn-primary m-5" onClick={gererSubmit} disabled={valeurInput.trim() === ''}>
        Add Task
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Tu viens d'ajouter la tâche "{valeurInput}" à votre TODO-LIST.</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Fermer.</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  </>
  )
}

export default App
