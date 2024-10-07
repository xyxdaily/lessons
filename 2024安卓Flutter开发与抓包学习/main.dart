// import 'dart:convert';
import 'dart:io';
// import 'dart:typed_data';
import 'package:flutter/material.dart';
// import 'package:http/http.dart' as http;
import 'package:http/io_client.dart';
import 'package:crypto/crypto.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:path_provider/path_provider.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          // title: Text('Flutter SSL Pinning Example Easy'),
          title: const Text('Flutter SSL Pinning Example Medium'),
        ),
        body: Center(
          child: NetworkExample(),
        ),
      ),
    );
  }
}

class NetworkExample extends StatefulWidget {
  const NetworkExample({super.key});

  @override
  _NetworkExampleState createState() => _NetworkExampleState();
}

class _NetworkExampleState extends State<NetworkExample> {
  String _response = 'No response yet';

  Future<void> _fetchData() async {
    final client = await _createHttpClient();
    // final url = Uri.parse('https://www.baidu.com/');
    final url = Uri.parse('https://httpbin.org/json');
    // final url = Uri.parse('https://hao123.com/');
    final response = await client.get(url);

    if (response.statusCode == 200) {
      setState(() {
        // _response = jsonDecode(response.body)['title'];
        _response = response.body;
      });
    } else {
      setState(() {
        _response = 'Request failed with status: ${response.statusCode}';
      });
    }
  }

  String bytesToHex(List<int> bytes) {
    return bytes.map((byte) => byte.toRadixString(16).padLeft(2, '0')).join();
  }

  Future<void> saveContentToFile(String content) async {
    // 获取应用程序的文档目录
    final directory = await getApplicationDocumentsDirectory();
    final file = File('${directory.path}/example.txt');

    // 写入内容到文件
    await file.writeAsString(content);

    print('Content saved to file: ${file.path}');
  }

  Future<IOClient> _createHttpClient() async {
    const expectedPublicKeyHash =
        // '28689b30e4c306aab53b027b29e36ad6dd1dcf4b953994482ca84bdc1ecac996';
        '445eec78bc61215044a0379656aa2d5db5e42f76cb70b8d14c2077aa943d4ebb';
    // '9073ded9d993a934c29c5ec3c6afa7286d2f0f8848352f94d02035865d8568e2';

    // www.hao123.com
    // List<String> expectedPublicKeyHashList =
    // ['445eec78bc61215044a0379656aa2d5db5e42f76cb70b8d14c2077aa943d4ebb', '9073ded9d993a934c29c5ec3c6afa7286d2f0f8848352f94d02035865d8568e2'];

    // httpbin.org
    List<String> expectedPublicKeyHashList = [
      '28689b30e4c306aab53b027b29e36ad6dd1dcf4b953994482ca84bdc1ecac996'
    ];

    final client = HttpClient(context: SecurityContext());
    client.badCertificateCallback =
        (X509Certificate cert, String host, int port) {
      final derBytes = cert.der;
      print("host = ${host}");
      print("derBytes length = ${derBytes.length}");
      print('derBytes : ${bytesToHex(derBytes)}'); // android studio log长度有限制
      print('derBytes : ${(cert.pem)}');
      saveContentToFile(cert.pem);
      final publicKeyHash = sha256.convert(derBytes).toString();
      print('Public Key Hash: $publicKeyHash');
      if (expectedPublicKeyHashList
          .any((item) => item.contains(publicKeyHash))) {
        return true;
      } else {
        Fluttertoast.showToast(
          msg: 'SSL Pinning failed: Public key hash does not match',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0,
        );
        // return false;
        throw Exception('SSL Pinning failed: Public key hash does not match');
      }
      // if (publicKeyHash != expectedPublicKeyHash) {
      //   Fluttertoast.showToast(
      //     msg: 'SSL Pinning failed: Public key hash does not match',
      //     toastLength: Toast.LENGTH_SHORT,
      //     gravity: ToastGravity.BOTTOM,
      //     timeInSecForIosWeb: 1,
      //     backgroundColor: Colors.red,
      //     textColor: Colors.white,
      //     fontSize: 16.0,
      //   );
      //   // return false;
      //   throw Exception('SSL Pinning failed: Public key hash does not match');
      // }
      // return true;
    };

    // keylog file
    final directory = await getApplicationDocumentsDirectory();
    final log = File('${directory.path}/keylog.txt');
    client.keyLog =
        (line) => log.writeAsStringSync(line, mode: FileMode.append);

    return IOClient(client);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        ElevatedButton(
          onPressed: _fetchData,
          child: const Text('Fetch Data'),
        ),
        const SizedBox(height: 20),
        Text(_response),
      ],
    );
  }
}
