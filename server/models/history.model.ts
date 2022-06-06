import { Table, Column, Model } from "sequelize-typescript";

@Table
export default class History extends Model {
  @Column
  number1!: Number;
  @Column
  number2!: Number;
  @Column
  sum!: Number;
}
