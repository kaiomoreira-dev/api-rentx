interface ICreateRentalsDTO {
  car_id: string;
  user_id: string;
  expected_return_date: Date;

  // campos opicionais servem pra receber uma chamada de atualização.
  // como no caso de aluguel criaremo um aluguel sem passar id, end_date e total
  // para depois atualizaloes em outra tela no que será a devolução.
  id?: string;
  end_date?: Date;
  total?: number;
}

export { ICreateRentalsDTO };
