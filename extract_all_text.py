import pypdf
import os

pdf_files = {
    "C++ Cheatsheet.pdf": "cpp_text.txt",
    "DSA_CompleteNotes.pdf": "dsa_text.txt",
    "JS_Chapterwise_Notes.pdf": "js_text.txt",
    "The Ultimate Python Handbook.pdf": "python_text.txt"
}

base_dir = r"C:\Users\SUCHISMITA\.gemini\antigravity\scratch\codeverse"

for pdf, txt_name in pdf_files.items():
    pdf_path = os.path.join(base_dir, pdf)
    txt_path = os.path.join(base_dir, txt_name)
    
    if not os.path.exists(pdf_path):
        print(f"Skipping {pdf} - not found")
        continue
        
    try:
        reader = pypdf.PdfReader(pdf_path)
        all_text = []
        for idx, page in enumerate(reader.pages):
            text = page.extract_text()
            if text:
                all_text.append(f"--- Page {idx+1} ---\n{text}\n")
            else:
                all_text.append(f"--- Page {idx+1} ---\n[No extractable text]\n")
                
        with open(txt_path, "w", encoding="utf-8") as f:
            f.writelines(all_text)
        print(f"Extracted {pdf} to {txt_name}")
    except Exception as e:
        print(f"Error extracting {pdf}: {e}")
