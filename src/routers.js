import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import PageAluno from './pages/PageAlunos';
import PageDevido from './pages/PageDevidos';
import PageEmprestimo from './pages/PageEmprestimos';
import PageLivro from './pages/PageLivros';
import PageUsuario from './pages/PageUsuarios';
import LoginComponent from './pages/PageLogin';
import CadastroEmprestimos from './pages/PageEmprestimos/CadastroEmprestimos';
import PageConfiguracoes from './pages/PageConfiguracoes';
import CadastroAutor from './pages/PageAutor/CadastroAutor';
import CadastroEditora from './pages/PageEditora/CadastroEditora';
import CadastroCurso from './pages/PageCurso/CadastroCurso';
import CadastroCategoria from './pages/PageCategoria/CadastroCategoria';
import CadastroLivro from './pages/PageLivros/CadastroLivros';
import CadastroAlunos from './pages/PageAlunos/CadastroAlunos';
import PageNotFound from './pages/PageNotFound';

function RoutersApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginComponent />} />
        <Route path='/Usuarios' element={<PageUsuario />} />
        <Route path='/Alunos' element={<PageAluno />} />
        <Route path='/Livros' element={<PageLivro />} />
        <Route path='/Emprestimos' element={<PageEmprestimo />} />
        <Route path='/CadastrarEmprestimos' element={<CadastroEmprestimos />} />
        <Route path='/CadastrarEmprestimos/:id' element={<CadastroEmprestimos />} />
        <Route path='/CadastrarLivros' element={<CadastroLivro />} />
        <Route path='/CadastrarLivros/:id' element={<CadastroLivro />} />
        <Route path='/CadastrarAlunos' element={<CadastroAlunos />} />
        <Route path='/CadastrarAlunos/:id' element={<CadastroAlunos />} />
        <Route path='/Devidos' element={<PageDevido />} />
        <Route path='/Configuracoes' element={<PageConfiguracoes />} />
        <Route path='/Configuracoes/CadastrarAutor' element={<CadastroAutor />} />
        <Route path='/Configuracoes/CadastrarEditora' element={<CadastroEditora />} />
        <Route path='/Configuracoes/CadastrarCurso' element={<CadastroCurso />} />
        <Route path='/Configuracoes/CadastrarCategoria' element={<CadastroCategoria />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutersApp;
