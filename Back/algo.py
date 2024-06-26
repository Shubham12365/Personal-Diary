from textblob import TextBlob
import pandas as pd
import streamlit as st
import cleantext


st.header(' Diary Sentiment Analysis')
with st.expander('Analyze Text'):
    text = st.text_input('Text here: ')
    if text:
        blob = TextBlob(text)
        st.write('Polarity: ', round(blob.sentiment.polarity,2))
        st.write('Subjectivity: ', round(blob.sentiment.subjectivity,2))


    pre = st.text_input('Clean Text: ')
    if pre:
        st.write(cleantext.clean(pre, clean_all= False, extra_spaces=True ,
                                 stopwords=True ,lowercase=True ,numbers=True , punct=True))

with st.expander('Analyze CSV'):
    upl = st.file_uploader('Upload file')

    def score(x):
        blob1 = TextBlob(x)
        return blob1.sentiment.polarity

#
    def analyze(x):
        if x >= 0.8:
            return 'Excited'
        elif x < 0.8 and x > 0:
            return 'Happy'
        elif x<0 and x>-0.8:
            return 'Sad'
        elif x<-0.8:
            return 'Anger'
        else:
            return 'Neutral'

#
    if upl:
        df = pd.read_csv(upl)
        if 'Unnamed: 0' in df.columns:
            del df['Unnamed: 0'] 
        df['score'] = df['Texts'].apply(score)
        df['analysis'] = df['score'].apply(analyze)
        st.write(df.head(10))

        @st.cache
        def convert_df(df):
            # IMPORTANT: Cache the conversion to prevent computation on every rerun
            return df.to_csv().encode('utf-8')

        csv = convert_df(df)

        st.download_button(
            label="Download data as CSV",
            data=csv,
            file_name='sentiment.csv',
            mime='text/csv',
        )