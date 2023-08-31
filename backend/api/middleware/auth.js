const authenticateToken = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }

    const [, token] = authorizationHeader?.split(' ');

    try {
        // Chamar função para validar o JWT
        // const authService = new AuthService()
        // const id = await authService.validateToken(token)
    
        req.user = { id, token }
    
      } catch (error) {
        if (error instanceof AuthError) {
          return res.status(401).json({ message: 'Token inválido' })
        }
    
        return res.status(500).json({ error })
      }

    return next();
  };
  
  export default authenticateToken;