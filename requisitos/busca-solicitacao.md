# um funcionario busca a solicitação não processada

## Verificar número da solicitação para verificar a busca
- Recebe o ID do funcionário e ID da solicitação  
- Verifica se funcionário existe na base dados
- Verificar se o status do Fid está dísponivel
- Verifica se solicitação existe na base de dados
- Verifica se o estado da solicitação == autorizado
- Marca a solicitação como em processamento
- Alterar status do Fid para ocupado
- Veririficar se a solicitação está sendo processada
- Grava que o funcionário Fid iniciou processamento da solicitação Sid no datetime

##  Erro no recebimento do Fid ou Sid
## Erro de verificação de status do Fid

## Fid não disponivel

## Retornar erro caso solicitação não exista na base de dados
## Solicitação não autorizado

## Erro na alteração do status da solicitação

## Erro ao alterar status do Fid

## Erro quando já existir um processamento por outro Fid
## Erro ao salvar histórico do Fid


