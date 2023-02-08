# um funcionario busca a solicitação não processada

## Verificar número da solicitação para verificar a busca
- Recebe o ID do funcionário e ID da solicitação  -OK
- Verifica se funcionário existe na base dados  -OK
- Verificar se o status do Fid está dísponivel  -OK
- Verifica se solicitação existe na base de dados   -OK
- Verifica se o estado da solicitação == autorizado -OK
- Marca a solicitação como em processamento -OK
- Alterar status do Fid para ocupado    -OK
- Verificar se a solicitação está sendo processada
- Grava que o funcionário Fid iniciou processamento da solicitação Sid no datetime ?

## Erro no recebimento do Fid ou Sid -controller
## Erro de verificação de status do Fid -OK

## Fid não disponivel -OK

## Retornar erro caso solicitação não exista na base de dados -OK
## Solicitação não autorizado -OK

## Erro na alteração do status da solicitação-OK

## Erro ao alterar status do Fid-OK

## Erro quando já existir um processamento por outro Fid -OK
## Erro ao salvar histórico do Fid -?


