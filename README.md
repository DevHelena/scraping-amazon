# Scraping Amazon
By Helena Maia


Objetivo: Criar um script simples para fazer scraping das listagens de produtos da Amazon na primeira página dos resultados da pesquisa para uma palavra-chave específica.

Requisitos da Tarefa:

Backend/API (Node.js):
Configurar um projeto Node.js com as dependências necessárias (express, axios, cheerio, etc.).
Escrever um script usando axios para buscar o conteúdo da página de resultados da pesquisa da Amazon para uma palavra-chave específica.
Usar cheerio para analisar o conteúdo HTML e extrair os seguintes detalhes para cada listagem de produto na primeira página:
Título do produto
Classificação (estrelas de cinco)
Número de avaliações
URL da imagem do produto
Criar um endpoint /api/scrape onde uma requisição GET com um parâmetro de consulta ?keyword=suaPalavraChave inicie o processo de scraping e retorne os dados extraídos no formato JSON.

Frontend (HTML, CSS, JavaScript):
Desenvolver uma página web simples com:
Um campo de entrada para inserir a palavra-chave da pesquisa.
Um botão para iniciar o processo de scraping.
Estilizar a página web para ser amigável ao usuário e apresentável.
Implementar JavaScript para fazer uma chamada AJAX para o endpoint do backend quando o botão for clicado e exibir os resultados formatados de forma limpa na página.
Documentação:

Incluir comentários dentro do seu código para oferecer clareza sobre sua lógica e processo.
Incluir um arquivo README.md com as instruções de configuração e execução.
Considerações:

Certificar-se de lidar com erros de forma adequada tanto no backend quanto no frontend.
Fornecer instruções claras sobre como executar a aplicação.