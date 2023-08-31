
export const styles = ({
  etiquetaContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    
    borderRadius:15
  },
  etiquetaCard: {
    display: 'flex',
   // width: '100%',
    flexDirection: 'row',
    marginTop:'3%',
    paddingTop: 7,
    paddingLeft:7,
    paddingRight:7,
    paddingBottom:7,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor:'white',
  },

  etiquetaTitle: {
    fontSize: 24,
    fontWeight: 700,
    textAlign: 'center',
    color: '#000',
  },

  subTitle: {
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'center',
    color: '#000',
    letterSpacing:0.8
  },

  contentEsquerda: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentDireita: {
    marginLeft: 20,
    display: 'flex',
    flexDirection:'column',
    rowGap: 9,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  etiquetaRodape: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
