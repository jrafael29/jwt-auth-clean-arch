import { JwtService } from "./JwtService"

describe('suite de teste para: JwtService', () => {

    const payload = {
        id: 1,
        name: "josef"
    }
    let tokenGl: string;

    test('não deveria gerar um token sem payload', () => {
        expect(() => {
            JwtService.sign('')
        }).toThrow('invalid payload');
    })

    test('deveria gerar um token apartir de um payload', () => {
        const {value: token} = JwtService.sign(payload)
        tokenGl = token;
        const tokenParts = token.split('.')
        expect(tokenParts.length).toEqual(3);
    })

    
    test('não deveria descriptografar um token invalido', () => {
        const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Impvc2VmIiwiaWF0IjoxNzA1MDAwNTkyLCJleHAiOjE3MDUwMDA1OTJ9.NTyUOys7QELnfw_gqvaXBDHtSGoeRLtL2MwDl_f8f9k'
        const result = JwtService.verify(expiredToken);
        expect(result).toBe('jwt expired');
    })

    test('deveria descriptografar um token válido', () => {
        const result = JwtService.verify(tokenGl);
        expect(result).toHaveProperty("iat");
        expect(result).toHaveProperty("exp");
    })

})