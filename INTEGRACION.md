# Integración del Login con la App Bancaria

## Para tu compañero:

### 1. Reemplazar el componente demo

En `app/page.tsx`, reemplaza la línea:
\`\`\`tsx
<AppBancariaDemo userData={userData} onLogout={handleLogout} />
\`\`\`

Por tu componente principal:
\`\`\`tsx
<TuComponentePrincipal 
  userAddress={userData.address}
  userMnemonic={userData.mnemonic}
  loginMethod={userData.loginMethod}
  onLogout={handleLogout}
/>
\`\`\`

### 2. Datos que recibirás:

- **`userAddress`**: Dirección de la wallet del usuario
- **`userMnemonic`**: Frase semilla (solo si creó cuenta nueva)
- **`loginMethod`**: "metamask" o "created_account"
- **`onLogout`**: Función para cerrar sesión

### 3. Ejemplo de uso en tu componente:

\`\`\`tsx
interface Props {
  userAddress: string
  userMnemonic?: string
  loginMethod: "metamask" | "created_account"
  onLogout: () => void
}

export function TuComponentePrincipal({ userAddress, userMnemonic, loginMethod, onLogout }: Props) {
  return (
    <div>
      <h1>Bienvenido {userAddress}</h1>
      {loginMethod === "metamask" && <p>Conectado via MetaMask</p>}
      {userMnemonic && <p>Cuenta creada con frase semilla</p>}
      
      {/* Aquí va tu código existente */}
      <TarjetaCliente address={userAddress} />
      <TablaCliente />
      {/* etc... */}
    </div>
  )
}
\`\`\`

### 4. Cerrar sesión:

Usa la función `onLogout()` cuando el usuario quiera cerrar sesión.

### 5. Persistencia:

La sesión se guarda automáticamente en localStorage, así que el usuario no necesita volver a loguearse cada vez.
