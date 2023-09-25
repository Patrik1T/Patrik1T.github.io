def dalsi_narozeniny():
    print("Ahoj jsem neinteligentnější a nejlepší umělá inteligence, prosím udělej tenhleten dotazník abys otestoval mou paměť:")
    jmeno = input("Jaké je tvé jméno: ")
    prijmeni = input("Jaké je tvé příjmení: ")
    print(f"Ahoj {jmeno} {prijmeni}!")
    print("Věděl jsi, že jsem, tak inteligentní, že dokážu zjistit v jakém roce budeš mít narozeniny? Napiš svůj věk a uvidíš!")
    vek = int(input("Zadej svůj věk: "))
    
    rok = 2023
    if vek > 0:
        rok += 1
    
    
    print(f"Začni slavit {vek + 1}. narozeniny na začátku roku {rok}!")
    print("Nevím, co ti letos daruji, ale neboj se, já na ně určitě zapomenu!")
    print("Promiň nemohu pokračovat v dotazníku, protože jsem ztratil tvůj údaj o tvém jméně, napiš mi prosím tvé jméno znovu.")
    jm = input("Zadej své jméno: ")
    print(f"{jm}, opravdu? Myslel jsem, že jsi Bob.")
    print("Promiň nemohu pokračovat, protože jsem ztratil údaje o tvém příjmení, napiš své příjmení znovu.")
    prijm = input("Jaké je tvé příjmení: ")
    print(f"{prijm} údaj byl zapomenut, teda uložen.")
    print("Věděl jsi, že jsem, tak inteligentní, že dokážu zjistit kflgjglfkjglfkdgjldfgjlgfj? Napiš svůj věk a fdgdfgdgds!")
    v = int(input("Zadej svůj věk: "))
    
    roky = 2916
    if v > 0:
        roky += 1
        
    print(f"Začni slavit {v + 100}. narozeniny na začátku roku {roky}!")
    print(f"Omlouvám se, ale mohl by jsi mě ujisti že jsi {jmeno} {prijmeni} teda, že jsi {prijm} {jm} počkej ne, jsi {jmeno} {prijm}? Nenapsal jsem špatně vaše budouchí narozeniny?")
    print("ERROR, nastala chyba systému a ukončuji okamžitě program.")

if __name__ == "__main__":
    dalsi_narozeniny()