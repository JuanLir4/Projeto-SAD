import { useState } from 'react'
import './App.css'
import sadLogo from './assets/logos/sad.png'
import sadExtractorLogo from './assets/logos/sad-extractor.png'

const PAGES = {
  UPLOAD: 'upload',
  EDIT: 'edit',
  HISTORY_REPORTS: 'historyReports',
  HISTORY_USERS: 'historyUsers',
  INDICATORS: 'indicators',
  CONFIG: 'config',
}

const ROLE_ACCESS = {
  admin: [
    PAGES.UPLOAD,
    PAGES.EDIT,
    PAGES.HISTORY_REPORTS,
    PAGES.HISTORY_USERS,
    PAGES.INDICATORS,
    PAGES.CONFIG,
  ],
  gestor: [
    PAGES.UPLOAD,
    PAGES.EDIT,
    PAGES.HISTORY_REPORTS,
    PAGES.HISTORY_USERS,
    PAGES.INDICATORS,
  ],
  cadastro: [PAGES.UPLOAD, PAGES.EDIT, PAGES.HISTORY_REPORTS],
}

function deriveRoleFromEmail(email) {
  if (!email) return null
  if (email.includes('admin@')) return 'admin'
  if (email.includes('gestor@')) return 'gestor'
  if (email.includes('cadastro@')) return 'cadastro'
  return null
}

function LoginPage({ onLogin, initialDarkMode }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const role = deriveRoleFromEmail(email)
    if (!role) return

    onLogin({ role, email, darkMode: initialDarkMode })
  }

  return (
    <div className={`app-root ${initialDarkMode ? 'dark-mode' : ''}`}>
      <header className="top-bar">
        <div className="top-bar-left">
          <div className="brand">
            <img
              src={sadExtractorLogo}
              alt="SAD Extractor"
              className="brand-icon"
            />
            <div className="brand-text">
              <span className="brand-title">SAD Extractor</span>
            <span className="brand-subtitle">
              Sistema de Extração de Dados Imobiliários
            </span>
            </div>
          </div>
        </div>
        <div className="top-bar-right">
          <img
            src={sadLogo}
            alt="SAD"
            className="sad-logo"
          />
        </div>
      </header>

      <main className="main-layout login-only">
        <section className="login-section">
          <div className="login-card">
            <h1 className="login-title">Extractor - Acesso</h1>
            <div className="login-divider" />

            <form className="login-form" onSubmit={handleSubmit}>
              <label className="field-label" htmlFor="email">
                E-mail
              </label>
              <div className="field-wrapper">
                <select
                  id="email"
                  className="field-input"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                >
                  <option value="">Selecionar</option>
                  <option value="cadastro@sad.pe.gov.br">
                    cadastro@sad.pe.gov.br
                  </option>
                  <option value="gestor@sad.pe.gov.br">
                    gestor@sad.pe.gov.br
                  </option>
                  <option value="admin@sad.pe.gov.br">
                    admin@sad.pe.gov.br
                  </option>
                </select>
              </div>

              <label className="field-label" htmlFor="password">
                Senha
              </label>
              <div className="field-wrapper">
                <input
                  id="password"
                  type="password"
                  className="field-input"
                  placeholder="**********"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <button type="submit" className="primary-button">
                Entrar
              </button>

              <p className="forgot-text">
                Esqueceu a senha?{' '}
                <button type="button" className="link-button">
                  Clique aqui
                </button>
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer-bar">
        <span>
          ©Todos os direitos reservados à Secretaria de Administração de Pernambuco - 2025
        </span>
      </footer>
    </div>
  )
}

function AppHeader({ activePage, user, onNavigate, onLogout, onToggleSidebar, darkMode, onToggleDarkMode }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleAvatarClick = () => {
    setIsUserMenuOpen((prev) => !prev)
  }

  const handleLogoutClick = () => {
    setIsUserMenuOpen(false)
    onLogout()
  }

  const handleToggleDarkMode = () => {
    onToggleDarkMode()
  }

  return (
    <header className="top-bar">
      <div className="top-bar-left">
        {user && (
          <button
            type="button"
            className="menu-toggle"
            onClick={onToggleSidebar}
          >
            <span />
            <span />
            <span />
          </button>
        )}
        <div className="brand">
          <img
            src={sadExtractorLogo}
            alt="SAD Extractor"
            className="brand-icon"
          />
          <div className="brand-text">
            <span className="brand-title">SAD Extractor</span>
            <span className="brand-subtitle">
              Sistema de Extração de Dados Imobiliários
            </span>
          </div>
        </div>
      </div>
      <div className="top-bar-right">
        <img
          src={sadLogo}
          alt="SAD"
          className="sad-logo"
        />
        {user && (
          <div className="user-info">
            <span className="user-greeting">
              Olá, <strong>{user.email}</strong>
            </span>
            <div className="user-avatar-wrapper">
              <button
                type="button"
                className="user-avatar"
                onClick={handleAvatarClick}
              >
                TT
                <span className="avatar-chevron">▼</span>
              </button>
              {isUserMenuOpen && (
                <div className="user-menu">
                  <div className="user-menu-item dark-mode-toggle-item">
                    <span className="dark-mode-label">Modo Escuro</span>
                    <button
                      type="button"
                      className={`dark-mode-toggle ${darkMode ? 'dark-mode-toggle-on' : 'dark-mode-toggle-off'}`}
                      onClick={handleToggleDarkMode}
                      aria-label="Toggle dark mode"
                    >
                      <span className="dark-mode-toggle-thumb" />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="user-menu-item"
                    onClick={handleLogoutClick}
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

function UploadPage() {
  return (
    <main className="main-layout main-config">
      <section className="config-container">
        <header className="config-header">
          <h1>Upload dos documentos</h1>
          <p>
            Faça Upload de arquivos PDF para extrair automaticamente os dados
            dos laudos desejados.
          </p>
        </header>

        <section className="config-card upload-card">
          <div className="steps-bar">
            <div className="step step-active">
              <span className="step-number">1</span>
              <span className="step-label">Upload</span>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <span className="step-label">Edição</span>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <span className="step-label">Exportação</span>
            </div>
          </div>

          <div className="upload-area">
            <div className="upload-icon">⬆</div>
            <p>
              Arraste os arquivos aqui ou{' '}
              <button type="button" className="link-button upload-link">
                clique para selecionar
              </button>
            </p>
            <span className="upload-subtitle">
              Formatos suportados: PDF, DOCx
            </span>
          </div>
        </section>
      </section>
    </main>
  )
}

function EditDataPage() {
  return (
    <main className="main-layout main-config">
      <section className="config-container">
        <header className="config-header">
          <h1>Edição dos dados extraídos</h1>
          <p>Revise o resumo dos dados extraídos a partir dos laudos.</p>
        </header>

        <section className="config-card upload-card">
          <div className="steps-bar">
            <div className="step">
              <span className="step-number">1</span>
              <span className="step-label">Upload</span>
            </div>
            <div className="step step-active">
              <span className="step-number">2</span>
              <span className="step-label">Edição</span>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <span className="step-label">Exportação</span>
            </div>
          </div>

          <div className="table-wrapper edit-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome do arquivo</th>
                  <th>Dados extraídos</th>
                  <th>%</th>
                  <th>Confiabilidade</th>
                  <th>Ação recomendada</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Laudo_xxx.pdf</td>
                  <td>12/30</td>
                  <td>40%</td>
                  <td>
                    <span className="confidence-bar confidence-low" />
                  </td>
                  <td>Revisar Campos</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Laudo_xxx.pdf</td>
                  <td>30/30</td>
                  <td>100%</td>
                  <td>
                    <span className="confidence-bar confidence-high" />
                  </td>
                  <td>Prosseguir</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Laudo_xxx.pdf</td>
                  <td>21/30</td>
                  <td>70%</td>
                  <td>
                    <span className="confidence-bar confidence-medium" />
                  </td>
                  <td>Prosseguir</td>
                </tr>
                <tr className="row-danger">
                  <td>4</td>
                  <td>Laudo_xxx.pdf</td>
                  <td>03/30</td>
                  <td>10%</td>
                  <td>
                    <span className="confidence-bar confidence-very-low" />
                  </td>
                  <td>Descartado</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="edit-footer-actions">
            <button className="primary-button validate-button">
              Validar Dados
            </button>
          </div>
        </section>
      </section>
    </main>
  )
}

function HistoryReportsPage() {
  return (
    <main className="main-layout main-config">
      <section className="config-container">
        <header className="config-header">
          <h1>Histórico de Laudos</h1>
          <p>
            Visualização dos dados de todos os laudos que foram extraídos ao
            longo do tempo.
          </p>
        </header>

        <section className="config-card filters-card">
          <div className="filters-grid">
            <div className="form-group">
              <label>Nº do documento</label>
              <input className="field-input rectangular" placeholder="Pesquisar" />
            </div>
            <div className="form-group">
              <label>Endereço</label>
              <input className="field-input rectangular" placeholder="Pesquisar" />
            </div>
            <div className="form-group">
              <label>Coordenadas</label>
              <input className="field-input rectangular" placeholder="Pesquisar" />
            </div>
            <div className="form-group">
              <label>Data da Extração</label>
              <input className="field-input rectangular" placeholder="00/00/0000" />
            </div>
            <div className="form-group form-group-button">
              <button className="primary-button">Pesquisar</button>
            </div>
          </div>
        </section>

        <section className="config-card table-card">
          <header className="table-header">
            <h2>Visualização dos dados que foram extraídos</h2>
          </header>
          <div className="table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Nº do documento</th>
                  <th>Endereço</th>
                  <th>Coordenada geográfica (S)</th>
                  <th>Coordenada geográfica (W)</th>
                  <th>Estado de Conservação</th>
                  <th>Valor do Imóvel</th>
                  <th>Data da Extração</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>LA 000 SAD/XXX</td>
                  <td>Rua XXXX XXXXX</td>
                  <td>0º0'00,0"S</td>
                  <td>0º0'00,0"W</td>
                  <td>
                    <span className="status-pill status-good" />
                  </td>
                  <td>R$ x.xxx.xxx,xx</td>
                  <td>XX/XX/2025</td>
                </tr>
                <tr>
                  <td>LA 000 SAD/XXX</td>
                  <td>Rua XXXX XXXXX</td>
                  <td>0º0'00,0"S</td>
                  <td>0º0'00,0"W</td>
                  <td>
                    <span className="status-pill status-medium" />
                  </td>
                  <td>R$ x.xxx.xxx,xx</td>
                  <td>XX/XX/2025</td>
                </tr>
                <tr>
                  <td>LA 000 SAD/XXX</td>
                  <td>Rua XXXX XXXXX</td>
                  <td>0º0'00,0"S</td>
                  <td>0º0'00,0"W</td>
                  <td>
                    <span className="status-pill status-low" />
                  </td>
                  <td>R$ x.xxx.xxx,xx</td>
                  <td>XX/XX/2025</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="history-footer">
            <div className="history-footer-left">
              <span>3 laudos selecionados</span>
            </div>
            <div className="history-footer-right">
              <select className="field-input rectangular history-select">
                <option>Selecionar formato</option>
              </select>
              <button className="primary-button">Baixar laudos</button>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}

function HistoryUsersPage() {
  return (
    <main className="main-layout main-config">
      <section className="config-container">
        <header className="config-header">
          <h1>Histórico dos usuários</h1>
          <p>Log das ações dos usuários ativos.</p>
        </header>

        <section className="config-card table-card">
          <header className="table-header">
            <h2>Tabela padrão</h2>
          </header>
          <div className="table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Usuário</th>
                  <th>Ação</th>
                  <th>Nome do laudo</th>
                  <th>Data da modificação</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>User_01</td>
                  <td>Editou laudo</td>
                  <td>LA 000 SAD/XXX</td>
                  <td>18/07/2025</td>
                </tr>
                <tr>
                  <td>User_02</td>
                  <td>Extraiu novo laudo</td>
                  <td>LA 000 SAD/XXX</td>
                  <td>17/07/2025</td>
                </tr>
                <tr>
                  <td>User_03</td>
                  <td>Excluiu laudo</td>
                  <td>LA 000 SAD/XXX</td>
                  <td>18/07/2025</td>
                </tr>
                <tr>
                  <td>User_02</td>
                  <td>Editou laudo</td>
                  <td>LA 000 SAD/XXX</td>
                  <td>17/07/2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  )
}

function IndicatorsPage() {
  return (
    <main className="main-layout main-config">
      <section className="config-container">
        <header className="config-header">
          <h1>Painel de Indicadores</h1>
          <p>
            Principais métricas e acompanhamentos sobre os dados extraídos dos
            laudos.
          </p>
        </header>

        <section className="config-card indicators-grid">
          <div className="indicator-card">
            <h3>Total Sales</h3>
            <p className="indicator-value">¥ 126,560</p>
            <p className="indicator-sub">WoW Change 12%</p>
          </div>
          <div className="indicator-card">
            <h3>Visits</h3>
            <p className="indicator-value">8,846</p>
            <p className="indicator-sub">Daily Visits 1,224</p>
          </div>
          <div className="indicator-card">
            <h3>Payments</h3>
            <p className="indicator-value">6,560</p>
            <p className="indicator-sub">Conversion Rate 60%</p>
          </div>
          <div className="indicator-card">
            <h3>Operational Effect</h3>
            <p className="indicator-value">78%</p>
            <p className="indicator-sub">DoD Change</p>
          </div>
        </section>

        <section className="config-card indicators-chart-card">
          <div className="chart-tabs">
            <button className="chart-tab chart-tab-active">Sales</button>
            <button className="chart-tab">Visits</button>
          </div>
          <div className="fake-chart" />
        </section>
      </section>
    </main>
  )
}

function ConfigPage() {
  return (
    <main className="main-layout main-config">
        <section className="config-container">
          <header className="config-header">
            <h1>Configurações dos usuários</h1>
            <p>Configurações e cadastros dos usuários no sistema</p>
          </header>

          <section className="config-card">
            <h2>Novo usuário</h2>
            <div className="new-user-grid">
              <div className="form-group">
                <label>Nome</label>
                <input className="field-input rectangular" placeholder="User_001" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  className="field-input rectangular"
                  placeholder="user_001@sad.pe.gov.br"
                />
              </div>
              <div className="form-group">
                <label>Função</label>
                <select className="field-input rectangular">
                  <option>Selecione o cargo</option>
                </select>
              </div>
              <div className="form-group form-group-button">
                <button className="primary-button">Criar</button>
              </div>
            </div>
          </section>

          <section className="config-card table-card">
            <header className="table-header">
              <h2>Tabela padrão</h2>
            </header>
            <div className="table-wrapper">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Tipo</th>
                    <th>Último acesso</th>
                    <th>Total de acessos</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>04</td>
                    <td>Nome e sobrenome</td>
                    <td>email4@sad.pe.gov.br</td>
                    <td>Cadastro</td>
                    <td>10/07/2025</td>
                    <td>05</td>
                    <td className="actions-cell">
                      <button className="tag-button tag-danger">Inativar</button>
                      <button className="tag-button tag-primary">Editar</button>
                      <button className="tag-button tag-secondary">
                        Reenviar E-mail
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>03</td>
                    <td>Nome e sobrenome</td>
                    <td>email3@sad.pe.gov.br</td>
                    <td>Gestão</td>
                    <td>17/07/2025</td>
                    <td>10</td>
                    <td className="actions-cell">
                      <button className="tag-button tag-danger">Inativar</button>
                      <button className="tag-button tag-primary">Editar</button>
                      <button className="tag-button tag-secondary">
                        Reenviar E-mail
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>02</td>
                    <td>Nome e sobrenome</td>
                    <td>email2@sad.pe.gov.br</td>
                    <td>Cadastro</td>
                    <td>15/07/2025</td>
                    <td>02</td>
                    <td className="actions-cell">
                      <button className="tag-button tag-danger">Inativar</button>
                      <button className="tag-button tag-primary">Editar</button>
                      <button className="tag-button tag-secondary">
                        Reenviar E-mail
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>01</td>
                    <td>Nome e sobrenome</td>
                    <td>email1@sad.pe.gov.br</td>
                    <td>Cadastro</td>
                    <td>18/07/2025</td>
                    <td>10</td>
                    <td className="actions-cell">
                      <button className="tag-button tag-danger">Inativar</button>
                      <button className="tag-button tag-primary">Editar</button>
                      <button className="tag-button tag-secondary">
                        Reenviar E-mail
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </section>
    </main>
  )
}

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [activePage, setActivePage] = useState(PAGES.UPLOAD)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true
    }
    return false
  })

  const handleLogin = (user) => {
    setCurrentUser(user)
    setActivePage(PAGES.UPLOAD)
    setIsSidebarOpen(false)
    if (user.darkMode !== undefined) {
      setDarkMode(user.darkMode)
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setIsSidebarOpen(false)
    // Resetar para o tema do dispositivo ao deslogar
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
  }

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev)
  }

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} initialDarkMode={darkMode} />
  }

  let pageContent = null

  if (activePage === PAGES.UPLOAD) pageContent = <UploadPage />
  else if (activePage === PAGES.EDIT) pageContent = <EditDataPage />
  else if (activePage === PAGES.HISTORY_REPORTS)
    pageContent = <HistoryReportsPage />
  else if (activePage === PAGES.HISTORY_USERS)
    pageContent = <HistoryUsersPage />
  else if (activePage === PAGES.INDICATORS)
    pageContent = <IndicatorsPage />
  else if (activePage === PAGES.CONFIG) pageContent = <ConfigPage />

  return (
    <div className={`app-root ${darkMode ? 'dark-mode' : ''}`}>
      <AppHeader
        activePage={activePage}
        user={currentUser}
        onLogout={handleLogout}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onNavigate={(page) => {
          if (ROLE_ACCESS[currentUser.role].includes(page)) {
            setActivePage(page)
          }
        }}
      />

      {currentUser && (
        <>
          <div
            className={
              'sidebar-backdrop ' + (isSidebarOpen ? 'sidebar-backdrop-open' : '')
            }
            onClick={() => setIsSidebarOpen(false)}
          />
          <aside
            className={'sidebar ' + (isSidebarOpen ? 'sidebar-open' : '')}
          >
            <div className="sidebar-header">
              <span className="sidebar-title">Menu</span>
            </div>
            <nav className="sidebar-nav">
              {ROLE_ACCESS[currentUser.role].includes(PAGES.UPLOAD) && (
                <button
                  type="button"
                  className={
                    'sidebar-link ' +
                    (activePage === PAGES.UPLOAD ? 'sidebar-link-active' : '')
                  }
                  onClick={() => {
                    setActivePage(PAGES.UPLOAD)
                    setIsSidebarOpen(false)
                  }}
                >
                  Upload de documentos
                </button>
              )}
              {ROLE_ACCESS[currentUser.role].includes(PAGES.EDIT) && (
                <button
                  type="button"
                  className={
                    'sidebar-link ' +
                    (activePage === PAGES.EDIT ? 'sidebar-link-active' : '')
                  }
                  onClick={() => {
                    setActivePage(PAGES.EDIT)
                    setIsSidebarOpen(false)
                  }}
                >
                  Editar dados
                </button>
              )}
              {ROLE_ACCESS[currentUser.role].includes(PAGES.HISTORY_REPORTS) && (
                <button
                  type="button"
                  className={
                    'sidebar-link ' +
                    (activePage === PAGES.HISTORY_REPORTS
                      ? 'sidebar-link-active'
                      : '')
                  }
                  onClick={() => {
                    setActivePage(PAGES.HISTORY_REPORTS)
                    setIsSidebarOpen(false)
                  }}
                >
                  Histórico de Laudos
                </button>
              )}
              {ROLE_ACCESS[currentUser.role].includes(PAGES.HISTORY_USERS) && (
                <button
                  type="button"
                  className={
                    'sidebar-link ' +
                    (activePage === PAGES.HISTORY_USERS
                      ? 'sidebar-link-active'
                      : '')
                  }
                  onClick={() => {
                    setActivePage(PAGES.HISTORY_USERS)
                    setIsSidebarOpen(false)
                  }}
                >
                  Histórico De Usuários
                </button>
              )}
              {ROLE_ACCESS[currentUser.role].includes(PAGES.INDICATORS) && (
                <button
                  type="button"
                  className={
                    'sidebar-link ' +
                    (activePage === PAGES.INDICATORS
                      ? 'sidebar-link-active'
                      : '')
                  }
                  onClick={() => {
                    setActivePage(PAGES.INDICATORS)
                    setIsSidebarOpen(false)
                  }}
                >
                  Indicadores
                </button>
              )}
              {ROLE_ACCESS[currentUser.role].includes(PAGES.CONFIG) && (
                <button
                  type="button"
                  className={
                    'sidebar-link ' +
                    (activePage === PAGES.CONFIG ? 'sidebar-link-active' : '')
                  }
                  onClick={() => {
                    setActivePage(PAGES.CONFIG)
                    setIsSidebarOpen(false)
                  }}
                >
                  Configurações
                </button>
              )}
            </nav>
          </aside>
        </>
      )}

      {pageContent}
      <footer className="footer-bar">
        <span>
          ©Todos os direitos reservados à Secretaria de Administração de Pernambuco - 2025
        </span>
      </footer>
    </div>
  )
}

export default App
