**RF** = Requisito Funcional

**RNF** = Requisito não Funcional

**RN** = Regra de negócio

# Cadastro de Categoria
**RF**
    Deve ser possivel cadastrar uma categoria.

**RN**
    Não deve ser possivel cadastrar uma categoria com o mesmo nome.
    Apenas um administrador pode ter acesso para cadastrar uma nova categoria.

# Cadastro de Carro
**RF**
Deve ser possivel cadastrar um carro.
        
    Atributos padrão:
        - available = true
        - id = gerado pelo banco
        - created_at = gerado pelo banco
  
    Atributos utilizados
        - name
        - description
        - daily_rate
        - fine_amount
        - license_plate
        - brand
        - category_id
**RN**
    Não deve ser possivel cadas com a mesma placa.
    O carro deve ser cadastrado como disponivel true por padrao.
    Apenas um administrador pode ter acesso para cadastrar um carro novo.

# Listagem de Carro
**RF**
    Deve ser possivel listar todos os carros disponiveis.
    Deve ser possivel listar todos os carros disponiveis pela marca.
    Deve ser possivel listar todos os carros disponiveis pela categoria.
    Deve ser possivel listar todos os carros disponiveis pelo nome.

**RN**
    Não precisa ser administrador para acessar a lista de carros.


# Cadastro de IMG do carro
**RF**
    Deve ser possivel listar todos os carros existentes.
    Deve ser possivel cadastrar uma imagem de um carro.

**RNF** 
    Utilizaremos o multer para fazer a importação das imagens do carro.

**RN**
    Apenas um administrador pode ter acesso para cadastrar imagem do carro.
    Deve ser possivel cadastrar mais de uma imagem do carro.
    Não deve ser possivel cradastrar uma imagem para um carro que não existe.

# Cadastro de Especificação
**RF**
    Deve ser possivel cadastrar uma especificação.

**RN** 
    Apenas um administrador pode ter acesso para cadastrar uma especificaçãos.
    Não deve ser possivel cadastrar uma especificação com o mesmo nome.

# Cadastro de Especificação do carro
**RF**
    Deve ser possivel cadastrar uma especificação para um carro.

**RN** 
    Apenas um administrador pode ter acesso para cadastrar uma especificação para um carro.
    Não deve ser possivel possivel criar uma especificação para um carro que nao existe.

    Não deve ser possivel possivel cadastrar uma especificação ja existente para o mesmo  carro.

# Cadastro de Usuário
**RF**
    Deve ser possivel cadastrar uma usuário.
    
**RN** 
    Não deve ser possivel cadastrar uma usuário com o mesmo nome.
    Apenas um administrador pode ter acesso para cadastrar um usuário.
    Por padrão o usuário não deve ser criado como administrado.
    
# Aluguel de carros
**RF**
    Deve ser possivel alugar um carro.

**RN** 
    O usuário a operar deve ser administrador para alugar um carro ou mais.
    Não deve ser feito um aluguel para um usuário que ja tem um alugel existente.
    Não deve ser feito um aluguel para um carro que ja tem um alugel existente.
    O aluguel do carro deve ser no minimo de 24horas.
    Não deve ser feito um aluguel para um usuário que nao está cadastrado.
    Não deve ser feito um aluguel para um carro que nao está cadastrado.
