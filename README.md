# Struktura maszyny cyfrowej (PMC)

Maszyna komputerowa w architekturze opracowanej przez Johna von Neumanna składa się z:
1. **Pamięć** - miejsce przechowania danych
2. **Jednostka sterująca** - odpowiada za pobieranie instrukcji oraz ich przetwarzanie
3. **Jednostka arytmetyczno logiczna** - odpowiada za wykonywanie operacji matematycznych
4. **Wejście/wyjście** - wprowadzanie danych i wyświetlanie ich

Podczas przetwarzania informacji wykorzystywane są także tzw. **rejestry dodatkowe**:
1. Licznik rozkazów **PC**
2. Akumulator **AC**
3. Rejestr rozkazów **RR**
4. Rejestr operandu **OP**

Instrukcje (rozkazy) dla maszyny wykonuje się w języku **asemblera**.
Poniżej lista rozkazów wraz z kodem binarnym oraz opisem tego, co zachodzi w rejestrze.

<table>
    <tr>
        <th></th>
        <th>kod binarny</th>
        <th>nazwa</th>
        <th>działanie</th>
    </tr>
    <tr>
        <th>1</th>
        <td>0000</td>
        <td>NULL</td>
        <td></td>
    </tr>
    <tr>
        <th>2</th>
        <td>0001</td>
        <td>STOP</td>
        <td></td>
    </tr>
    <tr>
        <th>3</th>
        <td>0010</td>
        <td>LOAD</td>
        <td>AC <- OP</td>
    </tr>
    <tr>
        <th>4</th>
        <td>0011</td>
        <td>STORE</td>
        <td>M[OP] <- AC</td>
    </tr>
    <tr>
        <th>5</th>
        <td>0100</td>
        <td>JUMP</td>
        <td>PC <- OP</td>
    </tr>
    <tr>
        <th>6</th>
        <td>0101</td>
        <td>JNEG</td>
        <td>if(AC<0) => PC <- OP</td>
    </tr>
    <tr>
        <th>7</th>
        <td>0110</td>
        <td>JZEERO</td>
        <td>if(AC=0) => PC <- OP</td>
    </tr>
    <tr>
        <th>8</th>
        <td>0111</td>
        <td>SHIFT</td>
        <td>AC shift OP</td>
    </tr>
    <tr>
        <th>9</th>
        <td>1000</td>
        <td>ADD</td>
        <td>AC <- AC + OP</td>
    </tr>
    <tr>
        <th>10</th>
        <td>1001</td>
        <td>SUB</td>
        <td>AC <- AC - OP</td>
    </tr>
    <tr>
        <th>11</th>
        <td>1010</td>
        <td>MULT</td>
        <td>AC <- AC * OP</td>
    </tr>
    <tr>
        <th>12</th>
        <td>1011</td>
        <td>DIV</td>
        <td>AC <- AC / OP</td>
    </tr>
    <tr>
        <th>13</th>
        <td>1100</td>
        <td>MOD</td>
        <td>AC <- AC % OP</td>
    </tr>
    <tr>
        <th>14</th>
        <td>1101</td>
        <td>OR</td>
        <td>AC <- AC || OP</td>
    </tr>
    <tr>
        <th>15</th>
        <td>1110</td>
        <td>AND</td>
        <td>AC <- AC && OP</td>
    </tr>
    <tr>
        <th>16</th>
        <td>1111</td>
        <td>NOT</td>
        <td>AC <- !OP</td>
    </tr>
</table>

Poniżej sposoby adresowania

<table>
    <tr>
        <td>00</td>
        <td>$</td>
        <td>natychmiastowy</td>
        <td>op <- RR.adr</td>
    </tr>
    <tr>
        <td>01</td>
        <td>@</td>
        <td>bezpośredni</td>
        <td>op <- m[RR.adr]</td>
    </tr>
    <tr>
        <td>10</td>
        <td>&</td>
        <td>pośredni</td>
        <td>op < m[m[RR.adr]]</td>
    </tr>
</table>
