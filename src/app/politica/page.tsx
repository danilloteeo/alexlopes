export default function Politica() {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black text-center mb-12">Política de Cancelamento</h1>
        
        <div className="space-y-8 text-lg leading-relaxed bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10">
          <p>Para garantir o melhor atendimento a todos os clientes, adotamos a seguinte política:</p>
          
          <ul className="space-y-6">
            <li className="flex gap-4">
              <span className="text-green-400 text-2xl">Check</span>
              <div>
                <strong>Cancelamento gratuito</strong> com até <strong>2 horas de antecedência</strong>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-yellow-500 text-2xl">Warning</span>
              <div>
                <strong>Menos de 2 horas</strong> → será cobrado 50% do valor do serviço
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-red-500 text-2xl">Cross</span>
              <div>
                <strong>Não comparecimento</strong> → cobrança de 100% do valor
              </div>
            </li>
          </ul>

          <p className="text-center text-green-400 font-bold text-xl mt-12">
            Entendemos imprevistos! Só pedimos respeito com quem está na fila de espera.
          </p>
        </div>
      </div>
    </div>
  );
}