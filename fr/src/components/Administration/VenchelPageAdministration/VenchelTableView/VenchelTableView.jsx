export const VenchelTableView = ({ data })=> {
  console.log(data)
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Высота</th>
          <th>Размещение</th>
          <th>Марка</th>
          <th>Номер</th>
          <th>Позиция</th>
          <th>Мощьность</th>
          <th>Тип</th>
          <th>Длина</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{(item.id).substring(0,3)}</td>
            <td>{item.height}</td>
            <td>{item.location}</td>
            <td>{item.model}</td>
            <td>{item.pos_num}</td>
            <td>{item.position}</td>
            <td>{item.power}</td>
            <td>{item.type}</td>
            <td>{item.width}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
